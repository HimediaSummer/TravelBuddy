package travelbuddy.function.member.service;

import jakarta.transaction.Transactional;
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
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.BuddyMatchRepository;
import travelbuddy.function.member.repository.MyBuddyRepository;
import travelbuddy.function.member.repository.MyProfileRepository;
import travelbuddy.util.FileUploadUtils;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MypageService {

    private static final Logger log = LoggerFactory.getLogger(MypageService.class);
    private final MyBuddyRepository myBuddyRepository;
    private final BuddyMatchRepository buddyMatchRepository;
    private final MyProfileRepository myProfileRepository;
    private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public MypageService(MyBuddyRepository myBuddyRepository, BuddyMatchRepository buddyMatchRepository, MyProfileRepository myProfileRepository, ModelMapper modelMapper) {
        this.myBuddyRepository = myBuddyRepository;
        this.buddyMatchRepository = buddyMatchRepository;
        this.myProfileRepository = myProfileRepository;
        this.modelMapper = modelMapper;
    }

    /* =========================================== My정보 =========================================== */

    public Object selectMyProfile() {
        log.info("[MypageService] selectMyProfile() Start");

        List<Account> accountMyProfile = myProfileRepository.findById();

        log.info("[MypageService] selectMyProfile() END");
        return accountMyProfile.stream().map(account -> modelMapper.map(account, AccountDTO.class)).collect(Collectors.toList());
    }



    /* =========================================== My일정 =========================================== */



    /* =========================================== My정보 =========================================== */
//    public int selectMypagePostTotal() {
//        log.info("[MypageService] selectMyPostTotal() Start");
//        List<Buddy> mypagePostList = mypageRepository.Buddy(1001);
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
//        Page<Buddy> result = mypageRepository.findByMemberCode(1001, paging);
//        List<Buddy> mypagePostList = (List<Buddy>)result.getContent(); // List<MemberBuddyData> 추출
//
//        log.info("[MypageService] selectMypagePostList End");
//        return mypagePostList.stream().map(mypagePost -> modelMapper.map(mypagePost, BuddyDTO.class)).collect(Collectors.toList());
//
//    }

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

    @Transactional
    public Object updateBuddy(BuddyDTO buddyDTO, MultipartFile buddyImg){
        log.info("[MypageService] updateBuddy() Start");
        log.info("[MypageService] buddyDTO : {}", buddyDTO);

        String replaceFileName = null;
        int result = 0;

        try {

            /* 설명. update 할 엔티티 조회 */
            Buddy buddy = myBuddyRepository.findById(buddyDTO.getBuddyCode()).get();
            String oriImage = buddy.getBuddyImg();
            log.info("[updateBuddy] oriImage : {}", oriImage);

            /* 설명. update를 위한 엔티티 값 수정 */
            buddy.setRegion(buddyDTO.getRegionCode());
            buddy.setBuddyType(buddyDTO.getBuddyTypeCode());
            buddy.setBuddyTitle(buddyDTO.getBuddyTitle());
            buddy.setBuddyContents(buddyDTO.getBuddyContents());
            buddy.setBuddyCreate(buddyDTO.getBuddyCreate());

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
            log.info("[MypageService] updateBuddy End ===================================");
            return (result > 0) ? "내가쓴글 수정 성공" : "퉤퉤퉤";
    }

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
