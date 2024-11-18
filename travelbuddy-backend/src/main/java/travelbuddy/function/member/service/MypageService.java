package travelbuddy.function.member.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.dto.BuddyMatchDataDTO;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.community.buddy.entity.BuddyMatchData;
import travelbuddy.function.community.buddy.entity.BuddyType;
import travelbuddy.function.community.buddy.repository.BuddyTypeRepository;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.BuddyMatchRepository;
import travelbuddy.function.member.repository.MyBuddyRepository;
import travelbuddy.function.member.repository.MyProfileRepository;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.util.FileUploadUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MypageService {

    private static final Logger log = LoggerFactory.getLogger(MypageService.class);
    private final MyBuddyRepository myBuddyRepository;
    private final BuddyMatchRepository buddyMatchRepository;
    private final MyProfileRepository myProfileRepository;
    private final BuddyTypeRepository buddyTypeRepository;
    private final RegionRepository regionRepository;
    private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public MypageService(MyBuddyRepository myBuddyRepository, BuddyMatchRepository buddyMatchRepository, MyProfileRepository myProfileRepository, BuddyTypeRepository buddyTypeRepository, RegionRepository regionRepository, ModelMapper modelMapper) {
        this.myBuddyRepository = myBuddyRepository;
        this.buddyMatchRepository = buddyMatchRepository;
        this.myProfileRepository = myProfileRepository;
        this.buddyTypeRepository = buddyTypeRepository;
        this.regionRepository = regionRepository;
        this.modelMapper = modelMapper;
    }

    /* =========================================== My정보 =========================================== */
    /* 회원정보조회 */
    public Object selectMyProfile() {
        log.info("[MypageService] selectMyProfile() Start");

        List<Account> accountMyProfile = myProfileRepository.findById();

        log.info("[MypageService] selectMyProfile() END");
        return accountMyProfile.stream().map(account -> modelMapper.map(account, AccountDTO.class)).collect(Collectors.toList());
    }

    /* 회원정보수정 */
    @Transactional
    public Object updateMyProfile(AccountDTO accountDTO, MultipartFile memberImg) {
        log.info("[MypageService] updateMyProfile() Start");
        log.info("[MypageService] accountDTO : {}", accountDTO);

        String replaceFileName = null;
        int result = 0;

        try {
            Account account = myProfileRepository.findByMemberCodeUpdate(accountDTO.getMemberCode())
                    .orElseThrow(() -> new EntityNotFoundException("멤버코드못찾는대 " + accountDTO.getMemberCode()));

            String oriImage = account.getMemberImg();
            log.info("[updateBuddy] oriImage : {}", oriImage);

            if (accountDTO.getMemberFullName() != null) {
                account.setMemberFullName(accountDTO.getMemberFullName());
            }
            if (accountDTO.getMemberPhone() != null) {
                account.setMemberPhone(accountDTO.getMemberPhone());
            }
            if (accountDTO.getMemberEmail() != null) {
                account.setMemberEmail(accountDTO.getMemberEmail());
            }
            if (accountDTO.getMemberPassword() != null) {
                account.setMemberPassword(accountDTO.getMemberPassword());
            }
            if (accountDTO.getMemberName() != null) {
                account.setMemberName(accountDTO.getMemberName());
            }

            if (memberImg != null) {
                String imageName = UUID.randomUUID().toString().replace("-", "");
                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, memberImg);
                log.info("[updateMyProfile] InsertFileName : {}", replaceFileName);

                account.setMemberImg(replaceFileName);    // 새로운 파일 이름으로 update
                log.info("[updateMyProfile] deleteImage : {}", oriImage);

                boolean isDelete = FileUploadUtils.deleteFile(IMAGE_DIR, oriImage);
                log.info("[update] isDelete : {}", isDelete);
            } else {
                account.setMemberImg(oriImage);
            }
            result = 1;
        } catch (
                IOException e) {
            log.info("[updateBuddy] Exception!!");
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException("회원정보수정오류오류오류오류", e);
        }
        log.info("[MypageService] updateBuddy End ");
        return (result > 0) ? "내정보 수정성공" : "크리스탈";
    }

    /* 회원숨김 */
//    @Transactional
//    public Object putDeleteAccount(int memberCode) {
//        log.info("[MypageService] 숨김설정시작: memberCode = {}", memberCode);
//
//        Account account = (Account) myProfileRepository.findById(memberCode)
//                .orElseThrow(() -> new RuntimeException("숨김처리할 회원을 찾을 수 없습니다."));
//
//        account.setMemberLeave("Y");
//        myProfileRepository.saveMemberLeave(account);
//
//        log.info("[MypageService] 숨김 완료: memberCode = {}", memberCode);
//
//        return "return 회원숨김성공ㅊ";
//    }

    /* =========================================== My일정 =========================================== */






    /* =========================================== My커뮤니티 =========================================== */
    //    public int selectMypagePostTotal() {
//        log.info("[MypageService] selectMyPostTotal() Start");
//        List<Buddy> mypagePostList = myBuddyRepository.Buddy(1001);
//        log.info("[MypageService] selectMyPostTotal()끝");
//        return mypagePostList.size();
//    }

//    public Object selectMypagePostList(Criteria cri) {
//        log.info("[MypageService] selectMyPostList Start11");
//
//        int index = cri.getPageNum() -1;
//        int count = cri.getAmount();
//        Pageable paging = PageRequest.of(index, count, Sort.by("buddyCode").descending());
//
//        Page<Buddy> result = myBuddyRepository.findByMemberCode(1001, paging);
//        List<Buddy> mypagePostList = (List<Buddy>)result.getContent(); // List<MemberBuddyData> 추출
//
//        log.info("[MypageService] selectMypagePostList End");
//        return mypagePostList.stream().map(mypagePost -> modelMapper.map(mypagePost, BuddyDTO.class)).collect(Collectors.toList());
//
//    }

    /* 내가쓴버디게시글조회 */
    public Object selectBuddyList() {
        log.info("[MypageService] selectBuddyList() Start");
        List<Buddy> selectBuddyList = myBuddyRepository.findByMemberCode();

        System.out.println("selectBuddyList = " + selectBuddyList);

        List<BuddyDTO> buddyList = selectBuddyList.stream()
                .map(buddy -> {
                    BuddyDTO buddyDto = modelMapper.map(buddy, BuddyDTO.class);

                    // account.memberCode -> BuddyDTO.memberCode 매핑
                    if (buddy.getAccount() != null) {
                        buddyDto.setMemberCode(buddy.getAccount().getMemberCode());
                    } return buddyDto;
                })
                .collect(Collectors.toList());

        log.info("[MypageService] selectMypagePostList() END");

        return buddyList;
    }

    /* 내가쓴버디게시글상세조회및신청회원목록조회 */
    public Map<String, Object> getBuddyDetail(int buddyCode) {
        log.info("[MypageService] getBuddyDetail() Start");

        Buddy getBuddyDetail = myBuddyRepository.findById(buddyCode).get();
//        buddy.setBuddyImageUrl(IMAGE_URL + buddy.getBuddyImageUrl());
        List<BuddyMatchData> buddyMatchDataList = buddyMatchRepository.findByBuddyCode(buddyCode);

        BuddyDTO buddyDTO = modelMapper.map(getBuddyDetail, BuddyDTO.class);
        if (getBuddyDetail.getAccount() != null) {
            buddyDTO.setMemberCode(getBuddyDetail.getAccount().getMemberCode());
        }

        List<BuddyMatchDataDTO> buddyMatchDataDTOList = buddyMatchDataList.stream().map(matchData -> {
            BuddyMatchDataDTO bmdd = new BuddyMatchDataDTO();
            bmdd.setBuddyMatchCode(matchData.getBuddyMatchCode());
            bmdd.setApplyId(matchData.getApplyId());
            bmdd.setApplyStatus(Integer.parseInt(matchData.getApplyStatus()));
            if (matchData.getBuddy() != null) {
                bmdd.setBuddyCode(matchData.getBuddy().getBuddyCode());
            }
            return bmdd;
        }).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("getBuddyDetail", buddyDTO);
        result.put("getBuddyMatchList", buddyMatchDataDTOList);

        log.info("[MypageService] getBuddyDetail() END");

        return result;
    }

    /* 내가쓴버디게시글수정 */
    @Transactional
    public Object updateBuddy(BuddyDTO buddyDTO, MultipartFile buddyImg){
        log.info("[MypageService] updateBuddy() Start");
        log.info("[MypageService] buddyDTO : {}", buddyDTO);

        String replaceFileName = null;
        int result = 0;

        try {

            Buddy buddy = myBuddyRepository.findById(buddyDTO.getBuddyCode()).get();
            String oriImage = buddy.getBuddyImg();
            log.info("[updateBuddy] oriImage : {}", oriImage);


            if (buddyDTO.getRegionCode() != 0) {
                Region region = regionRepository.findById(buddyDTO.getRegionCode())
                        .orElseThrow(() -> new EntityNotFoundException("Region not found for ID: " + buddyDTO.getRegionCode()));
                buddy.setRegion(region);
            }

            if (buddyDTO.getBuddyTypeCode() != 0) {
                BuddyType buddyType = buddyTypeRepository.findById(buddyDTO.getBuddyTypeCode())
                        .orElseThrow(() -> new EntityNotFoundException("BuddyType not found for ID: " + buddyDTO.getBuddyTypeCode()));
                buddy.setBuddyType(buddyType);
            }
            if (buddyDTO.getBuddyTitle() != null) {
                buddy.setBuddyTitle(buddyDTO.getBuddyTitle());
            }
            if (buddyDTO.getBuddyContents() != null) {
                buddy.setBuddyContents(buddyDTO.getBuddyContents());
            }
            if (buddyDTO.getBuddyCreate() != null) {
                buddy.setBuddyCreate(buddyDTO.getBuddyCreate());
            }

            if(buddyImg != null){
                String imageName = UUID.randomUUID().toString().replace("-", "");
                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, buddyImg);
                log.info("[updateBuddy] InsertFileName : {}", replaceFileName);

                buddy.setBuddyImg(replaceFileName);	// 새로운 파일 이름으로 update
                log.info("[updateBuddy] deleteImage : {}", oriImage);

                boolean isDelete = FileUploadUtils.deleteFile(IMAGE_DIR, oriImage);
                log.info("[update] isDelete : {}", isDelete);
            } else {
                buddy.setBuddyImg(oriImage);
            }

            result = 1;
        } catch (
                IOException e) {
            log.info("[updateBuddy] Exception!!");
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
        }
        log.info("[MypageService] updateBuddy End ");
        return (result > 0) ? "내가쓴글 수정 성공" : "퉤퉤퉤";
    }

    /* 내가쓴버디게시글삭제 */
    @Transactional
    public Object deleteBuddyCode(int buddyCode) {
        log.info("[MypageService] 삭제 시작: buddyCode = {}", buddyCode);

        Buddy buddy = myBuddyRepository.findById(buddyCode)
                .orElseThrow(() -> new RuntimeException("삭제할 게시글을 찾을 수 없습니다."));

        myBuddyRepository.delete(buddy);

        log.info("[MypageService] 삭제 완료: buddyCode = {}", buddyCode);

        return "return 게시글 삭제 성공";
    }

}
