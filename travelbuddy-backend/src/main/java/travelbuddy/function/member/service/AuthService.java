package travelbuddy.function.member.service;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import travelbuddy.exception.DuplicatedMemberNameException;
import travelbuddy.exception.LoginFailedException;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.dto.AuthorityDTO;
import travelbuddy.function.member.dto.TokenDTO;
import travelbuddy.function.member.entity.AccountEntity;
import travelbuddy.function.member.entity.AuthorityEntity;
import travelbuddy.function.member.repository.AuthorityRepository;
import travelbuddy.function.member.repository.MemberRepository;
import travelbuddy.jwt.TokenProvider;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final ModelMapper modelMapper;
    private final AuthorityRepository authorityRepository;

    @Autowired
    public AuthService(MemberRepository memberRepository, PasswordEncoder passwordEncoder,
                       TokenProvider tokenProvider, ModelMapper modelMapper, AuthorityRepository authorityRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
        this.modelMapper = modelMapper;
        this.authorityRepository = authorityRepository;
    }

    public Object login(AccountDTO accountDTO) {

        log.info("[AuthService] login() START");
        log.info("[AuthService] {}", accountDTO);

        /* 목차. 1. 아이디 조회 */
        AccountEntity member = memberRepository.findByMemberName(accountDTO.getMemberName());

        if(member == null) {
            log.info("[AuthService] login() Required User Not Found!");
            throw new LoginFailedException(accountDTO.getMemberName() + " 유저를 찾을 수 없습니다.");
        }

        /* 목차. 2. 비밀번호 매칭 */
        if(!passwordEncoder.matches(accountDTO.getMemberPassword(), member.getMemberPassword())) {
            log.info("[AuthService] login() Password Match Failed!");
            throw new LoginFailedException("잘못된 비밀번호 입니다.");
        }

        /* 목차. 3. 토큰 발급 */
        TokenDTO newToken = tokenProvider.generateTokenDTO(member);

        return newToken;
    }

    /* 설명. signup은 DML(INSERT) 작업이므로 @Transactional 어노테이션 추가 */
    @Transactional
    public AccountDTO signup(AccountDTO accountDTO) {
        log.info("[AuthService] signup() Start.");
        log.info("[AuthService] accountDTO {}", accountDTO);

        /* 설명. 아이디 중복 유효성 검사(비즈니스 로직에 따라 선택적으로 구현하면 됨) */
        if(memberRepository.findByMemberName(accountDTO.getMemberName()) != null) {
            log.info("[AuthService] 아이디가 중복됩니다.");
            throw new DuplicatedMemberNameException("아이디가 중복됩니다.");
        }

        /* 설명. 우선 Repository로 쿼리를 작성하기 전에 DTO를 Entity로 매핑. */
        AccountEntity registMember = modelMapper.map(accountDTO, AccountEntity.class);

        /* 목차. 1. tbl_member 테이블에 회원 INSERT */
        /* 설명. 비밀번호 암호화 후 insert */
        System.out.println("registMember = " + registMember);
        registMember.setMemberPassword(passwordEncoder.encode(registMember.getMemberPassword()));
        System.out.println("registMember = " + registMember);
//        AccountEntity result1 = memberRepository.save(registMember);		// 설명. 반환형은 int값이 아닌 엔티티임.

        /* 목차. 2. tbl_member_role 테이블에 회원별 권한 INSERT (현재 엔티티에는 회원가입 후 pk값이 없다!) */
        /* 목차. 2-1. 우선 일반 권한(AuthorityCode값이 2번)의 회원을 추가(일종의 디폴트 권한을 지정해주면 됨) */
        /*
         * 목차. 2-2. 엔티티에는 추가 할 회원의 pk값이 아직 없으므로 기존 회원의 마지막 회원 번호를 조회
         *      (하지만 jpql에 의해 앞선 save와 jpql이 flush()로 쿼리와 함께 날아가고 회원이 이미 sequence객체 값
         *       증가와 함께 insert가 되 버린다. -> 결론은, maxMemberCode가 현재 가입하는 회원의 번호이다.)
         * */
//        int maxMemberCode = memberRepository.maxMemberCode();	// 설명. JPQL을 사용해 회원번호 max값 추출

        // 기본 권한 코드 설정
//        AuthorityEntity defaultAuthority = new AuthorityEntity();
//        defaultAuthority.setAuthorityCode(2);
//        System.out.println("defaultAuthority = " + defaultAuthority);

        registMember.setMemberCreate(LocalDateTime.now());
//        registMember.setMemberDeletion("N");
//        registMember.setMemberSuspension("N");

        AuthorityEntity existingAuthority = authorityRepository.findByAuthorityCode(2);

        if(existingAuthority != null) {
            registMember.setAuthority(existingAuthority);
        } else {
            AuthorityEntity defaultAuthority = new AuthorityEntity();
            defaultAuthority.setAuthorityCode(2);
            defaultAuthority.setAuthorityCodeName("일반 사용자");
            authorityRepository.save(defaultAuthority);
            registMember.setAuthority(defaultAuthority);
        }


        AccountEntity result2 = memberRepository.save(registMember);
        System.out.println("result2 = " + result2);

//        registMember.setAuthority(defaultAuthority);
//
//        AccountEntity result2 = memberRepository.save(registMember);

        /* 설명. 위의 두 가지 save()가 모두 성공해야 해당 트랜잭션이 성공했다고 판단. */
        log.info("[AuthService] Member Insert Result {}",
//                (result1 != null && result2 != null) ? "회원 가입 성공" : "회원 가입 실패");
                (result2 != null) ? "회원 가입 성공" : "회원 가입 실패");

        log.info("[AuthService] signup() End.");

        return accountDTO;
    }
}
