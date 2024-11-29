package travelbuddy.function.member.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.apache.commons.io.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.dto.BuddyMatchDataDTO;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.community.buddy.entity.BuddyMatchData;
import travelbuddy.function.community.buddy.entity.BuddyType;
import travelbuddy.function.community.buddy.repository.BuddyTypeRepository;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.*;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.AccommodationRepository;
import travelbuddy.function.schedule.repository.RegionRepository;

import java.io.IOException;

@Service
public class MypageService {

    private static final Logger log = LoggerFactory.getLogger(MypageService.class);
    private final MyBuddyRepository myBuddyRepository;
    private final MyBuddyMatchRepository myBuddyMatchRepository;
    private final MyProfileRepository myProfileRepository;
    private final BuddyTypeRepository buddyTypeRepository;
    private final RegionRepository regionRepository;
    private final MyScheduleRepository myScheduleRepository;
    private final ModelMapper modelMapper;

    /* 프로필사진 루트 */
    @Value("${image.profile.image-dir}")
    private String profileImgDir;
    @Value("${image.profile.image-url}")
    private String profileImgUrl;

    /* buddyImg 루트 */
    @Value("${image.buddy.image-dir}")
    private String buddyImageDir;
    @Value("${image.buddy.image-url}")
    private String buddyImageUrl;

    @Autowired
    public MypageService(MyBuddyRepository myBuddyRepository, MyBuddyMatchRepository myBuddyMatchRepository, MyProfileRepository myProfileRepository, BuddyTypeRepository buddyTypeRepository, RegionRepository regionRepository, MyScheduleRepository myScheduleRepository, ModelMapper modelMapper) {
        this.myBuddyRepository = myBuddyRepository;
        this.myBuddyMatchRepository = myBuddyMatchRepository;
        this.myProfileRepository = myProfileRepository;
        this.buddyTypeRepository = buddyTypeRepository;
        this.regionRepository = regionRepository;
        this.myScheduleRepository = myScheduleRepository;
        this.modelMapper = modelMapper;
    }

    // 현재 로그인한 사용자(AccountDTO) 가져오기
    public static AccountDTO getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof AccountDTO) {
            return (AccountDTO) principal;
        }
        return null; // 인증되지 않은 경우
    }

    // 현재 로그인한 사용자의 memberName 가져오기
    public static String getCurrentUsername() {
        AccountDTO currentUser = getCurrentUser();
        return currentUser != null ? currentUser.getMemberName() : null;
    }

    // 현재 로그인한 사용자의 memberCode 가져오기
    public static Integer getCurrentMemberCode() {
        AccountDTO currentUser = getCurrentUser();
        return currentUser != null ? currentUser.getMemberCode() : null;
    }

    /* =========================================== My정보 =========================================== */
    /* 회원정보조회 */
    public Object selectMyProfile(Integer memberCode) {
        log.info("[MypageService] selectMyProfile() Start");

        List<Account> accountMyProfile = myProfileRepository.findByLoginMemberCode(memberCode);
        if (accountMyProfile.isEmpty()) {
            throw new RuntimeException("회원 정보를 찾을 수 없습니다.");
        }

        // 이미지 URL 추가 처리
        accountMyProfile.forEach(account -> {
            String memberImg = account.getMemberImg();
            account.setMemberImg((memberImg == null || memberImg.isEmpty())
                    ? null
                    : profileImgUrl + memberImg);
        });

        log.info("[MypageService] selectMyProfile() END");
        return accountMyProfile;
    }

    /* 회원정보수정 */
    @Transactional
    public String updateMyProfile(AccountDTO accountDTO, MultipartFile profileImg) {
        log.info("[MypageService] updateMyProfile() Start");
        log.info("[MypageService] accountDTO : {}", accountDTO);

        // 1. DB에서 계정 조회
        Account account = myProfileRepository.findByMemberCodeUpdate(accountDTO.getMemberCode())
                .orElseThrow(() -> new EntityNotFoundException("멤버코드 못찾음: " + accountDTO.getMemberCode()));

        // 2. 기존 파일 삭제
        String oldImage = account.getMemberImg();
        String randomFileName = null;

        // 3. 새 파일 처리
        if (profileImg != null && !profileImg.isEmpty()) {
            log.info("Uploading file: Original Name!!!!!!!!!!!!!!! = {}", profileImg.getOriginalFilename());
            log.info("File Size!!!!!!!!!!!!!! = {}", profileImg.getSize());
            log.info("Content Type!!!!!!!!!!!!!! = {}", profileImg.getContentType());
            try {
                randomFileName = UUID.randomUUID().toString().replace("-", "") + "." +
                        FilenameUtils.getExtension(profileImg.getOriginalFilename());

                // 파일 저장 경로 설정 (profileImgDir 사용)
                Path uploadPath = Paths.get(profileImgDir).toAbsolutePath(); // profileImgDir 값 활용
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                    log.info("Created directory: {}", uploadPath.toString());
                }

                Path destinationPath = uploadPath.resolve(randomFileName);
                profileImg.transferTo(destinationPath.toFile());
                log.info("File saved successfully to {}", destinationPath.toString());

                // 기존 파일 삭제 (기본 이미지 제외)
                if (oldImage != null && !oldImage.equals("member_img_default.png")) { // 기본 이미지명만 비교
                    Path oldFilePath = Paths.get(profileImgDir).resolve(oldImage).toAbsolutePath(); // 절대 경로로 확인
                    File oldFile = oldFilePath.toFile();
                    if (oldFile.exists() && oldFile.delete()) {
                        log.info("Deleted old image: {}", oldImage);
                    } else {
                        log.warn("Failed to delete old image or file not found: {}", oldImage);
                    }
                }
            } catch (IOException e) {
                log.error("Error occurred while saving file", e);
                throw new RuntimeException("File save error", e);
            }
        }

        // 2. 새로운 값이 있을 경우 기존 Account 엔티티 업데이트
        if (accountDTO.getMemberFullName() != null && !accountDTO.getMemberFullName().trim().isEmpty()) {
            account.setMemberFullName(accountDTO.getMemberFullName());
            log.info("Updated FullName: {}", accountDTO.getMemberFullName());
        }

        if (accountDTO.getMemberEmail() != null && !accountDTO.getMemberEmail().trim().isEmpty()) {
            account.setMemberEmail(accountDTO.getMemberEmail());
            log.info("Updated Email: {}", accountDTO.getMemberEmail());
        }

        if (accountDTO.getMemberPhone() != null && !accountDTO.getMemberPhone().trim().isEmpty()) {
            account.setMemberPhone(accountDTO.getMemberPhone());
            log.info("Updated Phone: {}", accountDTO.getMemberPhone());
        }

        if (accountDTO.getMemberName() != null && !accountDTO.getMemberName().trim().isEmpty()) {
            accountDTO.setMemberName(account.getMemberName());
        }

        // 5. 새로운 이미지 파일 이름 저장
        if (randomFileName != null) {
            account.setMemberImg(randomFileName);
        }

        myProfileRepository.save(account);
        log.info("[MypageService] Account saved successfully!저장해라");

        return randomFileName != null ? randomFileName : oldImage;
    }

    /* 회원숨김 */
    @Transactional
    public Object putDeleteAccount(int memberCode) {
        log.info("[MypageService] 숨김설정시작: memberCode = {}", memberCode);

        Account account = (Account) myProfileRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> new RuntimeException("숨김처리할 회원을 찾을 수 없습니다."));

        account.setMemberDeletion("Y");
        account.setMemberLeave(String.valueOf(LocalDate.now()));

        myProfileRepository.save(account);

        log.info("[MypageService] 숨김 완료: memberCode = {}", memberCode);

        return "return 회원숨김성공ㅊ";
    }

    /* =========================================== My일정 =========================================== */
    /* 내 일정 목록 조회 */
    public int selectScheTotal(int memberCode) {
        log.info("[MyService] selectScheTotal() Start");
        int total = myScheduleRepository.countByMemberCode(memberCode);

        return total;
    }

    // Schedule 목록 페이징
    public List<Map<String, Object>> selectMyScheListPaging(Criteria cri, int memberCode) {
        log.info("[MyService] selectMyScheListPaging() Start");

        int index = Math.max(cri.getPageNum() - 1, 0);
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("scheCode").descending());

        Page<Object[]> results = myScheduleRepository.findAllScheListPaging(memberCode, paging);

        List<Map<String, Object>> scheList = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> scheMap = new HashMap<>();
            Schedule schedule = (Schedule) result[0];
            String regionName = (String) result[1];
            scheMap.put("scheList", schedule.getScheList());
            scheMap.put("scheCode", schedule.getScheCode());
            scheMap.put("scheStartDate", schedule.getScheStartDate());
            scheMap.put("scheEndDate", schedule.getScheEndDate());
            scheMap.put("memberCode", schedule.getAccount().getMemberCode());
            scheMap.put("regionName", regionName);

            scheList.add(scheMap);
        }
        System.out.println("scheList11111111 = " + scheList);

        log.info("[MypageService] selectMyScheList() END");
        return scheList;
    }

    /* 내 일정 상세 조회 */
    public Object getDetailSchedule(int scheCode) {
        log.info("[MypageService] getDetailSchedule() Start");

        Schedule schedule = myScheduleRepository.findById(scheCode).get();

        log.info("[MypageService] getDetailSchedule() End");
        return modelMapper.map(schedule, Schedule.class);
    }

    /* 내 일정 삭제 */
    @Transactional
    public Object deleteScheCode(List<Integer> scheCodes) {
        log.info("[MypageService] 삭제 시작: scheCode = {}", scheCodes);

        myScheduleRepository.deleteByScheCode(scheCodes);
        return "........거북이되는중";
    }

    /* =========================================== My커뮤니티 =========================================== */
    /* 내가 쓴 버디게시글 목록조회 */
    public int selectBuddyTotal(int memberCode) {
        log.info("[MyService] selectBuddyListTotal() Start");
        int total = myBuddyRepository.countByMemberCode(memberCode); // memberCode 사용
        log.info("[MyService] selectBuddyListTotal() End, Total: {}", total);
        return total;
    }

    // Buddy 목록 페이징
    public List<Map<String, Object>> selectBuddyListPaging(Criteria cri, int memberCode) {
        log.info("[MyService] selectBuddyListPaging() Start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("buddyCode").descending());

        Page<Object[]> results = myBuddyRepository.findAllBuddyListPaging(memberCode, paging);

        List<Map<String, Object>> buddyList = new ArrayList<>();
        for (Object[] result : results) {
            Map<String, Object> buddyMap = new HashMap<>();
            Buddy buddy = (Buddy) result[0];
            String regionName = (String) result[1];
            String buddyTypeName = (String) result[2];
            String memberName = (String) result[3];
            buddyMap.put("buddyTitle", buddy.getBuddyTitle());
            buddyMap.put("buddyCode", buddy.getBuddyCode());
            buddyMap.put("buddyCreate", buddy.getBuddyCreate());
            buddyMap.put("buddyStatus", buddy.getBuddyStatus());
            buddyMap.put("buddyCount", buddy.getBuddyCount());
            buddyMap.put("memberName", memberName);
            buddyMap.put("regionName", regionName);
            buddyMap.put("buddyTypeName", buddyTypeName);

            buddyList.add(buddyMap);
        }

        log.info("[MyService] selectBuddyListPaging() End");
        return buddyList;
    }


    /* 내가쓴버디게시글상세조회및신청회원목록조회 */
    public Map<String, Object> getBuddyDetail(int buddyCode) {
        log.info("[MypageService] getBuddyDetail() Start");

        Buddy getBuddyDetail = myBuddyRepository.findByBuddyCode(buddyCode);
        List<BuddyMatchData> buddyMatchDataList = myBuddyMatchRepository.findByBuddyCode(buddyCode);

        log.info("BuddyEntityaaaaaaaaaa:" + getBuddyDetail);

        // BuddyDTO와 Buddy 직접매핑
        BuddyDTO buddyDTO = new BuddyDTO();
        buddyDTO.setBuddyCode(getBuddyDetail.getBuddyCode());
        buddyDTO.setMemberCode(getBuddyDetail.getAccount().getMemberCode());
        buddyDTO.setRegionCode(getBuddyDetail.getRegion().getRegionCode());
        buddyDTO.setBuddyTypeCode(getBuddyDetail.getBuddyType().getBuddyTypeCode());
        buddyDTO.setBuddyTitle(getBuddyDetail.getBuddyTitle());
        buddyDTO.setBuddyContents(getBuddyDetail.getBuddyContents());
        buddyDTO.setBuddyCreate(getBuddyDetail.getBuddyCreate().toString());
        buddyDTO.setBuddyStatus(getBuddyDetail.getBuddyStatus());
        buddyDTO.setBuddyCount(getBuddyDetail.getBuddyCount());
        buddyDTO.setBuddyAt(getBuddyDetail.getBuddyAt());
        // buddyImg에 URL 연결
        if (getBuddyDetail.getBuddyImg() != null && !getBuddyDetail.getBuddyImg().isEmpty()) {
            // `,`로 나눠 List<String>으로 변환
            List<String> imageUrls = Arrays.stream(getBuddyDetail.getBuddyImg().split(","))
                    .map(img -> profileImgUrl + img.trim()) // 각 이미지 경로에 URL 추가
                    .collect(Collectors.toList());

            // List<String> -> String으로 변환하여 DTO에 설정
            String joinedImages = String.join(",", imageUrls);
            buddyDTO.setBuddyImg(joinedImages);
        } else {
            buddyDTO.setBuddyImg(""); // 이미지가 없을 경우 빈 문자열 설정
        }

        System.out.println("Manually Mapped BuddyDTO: " + buddyDTO);

        List<BuddyMatchDataDTO> buddyMatchDataDTOList = buddyMatchDataList.stream().map(matchData -> {
            BuddyMatchDataDTO bmdd = new BuddyMatchDataDTO();
            bmdd.setBuddyMatchCode(matchData.getBuddyMatchCode());
            bmdd.setApplyId(matchData.getApplyId());
            bmdd.setApplyStatus(matchData.getApplyStatus());
            if (matchData.getBuddy() != null) {
                bmdd.setBuddyCode(matchData.getBuddy().getBuddyCode());
            }
            return bmdd;
        }).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("getBuddyDetail", buddyDTO);
        result.put("getBuddyMatchList", buddyMatchDataDTOList);
        result.put("regionName", getBuddyDetail.getRegion().getRegionName());
        result.put("memberName", getBuddyDetail.getAccount().getMemberName());
        result.put("buddyTypeName", getBuddyDetail.getBuddyType().getBuddyTypeName());

        System.out.println("result = " + result);

        log.info("[MypageService] getBuddyDetail() END");

        return result;
    }

    /* 내가쓴글 신청자 매칭 상태 변경 */
    @Transactional
    public void updateApplyStatus(int buddyCode, int buddyMatchCode, int applyStatus) {
        log.info("[MypageService] updateBuddyApplyStatus() Start");

        List<BuddyMatchData> buddyMatchData = myBuddyMatchRepository.findByBuddyCode(buddyCode);

        // 2. 수락 상태 (applyStatus == 2)가 이미 존재하는지 검증
        boolean hasAccepted = buddyMatchData.stream()
                .anyMatch(data -> data.getApplyStatus() == 2);

        if (hasAccepted && applyStatus == 2) {
            throw new IllegalStateException("이미 수락한 신청자가 존재합니다.");
        }

        BuddyMatchData matchDataToUpdate = buddyMatchData.stream()
                .filter(data -> data.getBuddyMatchCode() == buddyMatchCode)
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("BuddyMatchData not found with buddyMatchCode: " + buddyMatchCode));

        matchDataToUpdate.setApplyStatus(applyStatus);
        myBuddyMatchRepository.save(matchDataToUpdate);
        ;
        log.info("[MypageService] updateBuddyApplyStatus() End");
    }

    /* 내가쓴버디게시글수정 */
    // 게시글 수정
    @Transactional
    public Map<String, Object> updateBuddy(int buddyCode, BuddyDTO buddyDTO, MultipartFile[] postImg) {
        log.info("Service: Updating buddy with buddyCode {}", buddyCode);

        // 1. 게시글 조회
        Buddy buddy = myBuddyRepository.findByBuddyCode(buddyCode);
        if (buddy == null) {
            throw new RuntimeException("수정할 게시글을 찾을 수 없습니다.");
        }

        // 2. 지역 및 버디 유형 조회
        Region region = regionRepository.findById(buddyDTO.getRegionCode())
                .orElseThrow(() -> new RuntimeException("유효하지 않은 지역 코드입니다."));
        BuddyType buddyType = buddyTypeRepository.findById(buddyDTO.getBuddyTypeCode())
                .orElseThrow(() -> new RuntimeException("유효하지 않은 버디 유형 코드입니다."));

        // 3. 게시글 수정
        buddy.setBuddyTitle(buddyDTO.getBuddyTitle());
        buddy.setBuddyContents(buddyDTO.getBuddyContents());
        buddy.setRegion(region); // 지역 정보 수정
        buddy.setBuddyType(buddyType); // 버디 유형 수정

        // 4. 이미지 처리
        if (postImg != null && postImg.length > 0) {
            long totalSize = 0;
            List<String> savedFileNames = new ArrayList<>();
            String basePath = "C:/HiFinalProject/TravelBuddy/travelbuddy-backend/buddyimgs/";

            // 총 용량 확인 및 파일 저장
            for (MultipartFile file : postImg) {
                totalSize += file.getSize();

                // 유효성 검사: 파일 크기 제한
                if (totalSize > 1048576) { // 1MB = 1,048,576 bytes
                    throw new IllegalArgumentException("이미지의 총 용량은 최대 1MB까지 허용됩니다.");
                }

                // 파일 저장
                String randomFileName = UUID.randomUUID().toString().replace("-", "") + "." +
                        FilenameUtils.getExtension(file.getOriginalFilename());
                Path destPath = Paths.get(basePath, randomFileName);

                try {
                    Files.copy(file.getInputStream(), destPath);
                    savedFileNames.add(randomFileName);
                    log.info("Saved file: {}", randomFileName);
                } catch (IOException e) {
                    log.error("Error while saving image file", e);
                    throw new RuntimeException("파일 저장 중 오류 발생", e);
                }
            }

            // 기존 파일 삭제 (기본 이미지 제외)
            String existingImages = buddy.getBuddyImg();
            if (existingImages != null && !existingImages.isEmpty()) {
                for (String oldImage : existingImages.split(",")) {
                    if (!oldImage.equals("default.png")) {
                        File oldFile = new File(basePath + oldImage.trim());
                        if (oldFile.exists() && oldFile.delete()) {
                            log.info("Deleted old file: {}", oldImage);
                        } else {
                            log.warn("Failed to delete old file: {}", oldImage);
                        }
                    }
                }
            }
            // 새로운 파일 이름 저장
            buddy.setBuddyImg(String.join(",", savedFileNames));
        }

        // 5. 변경된 게시글 저장
        myBuddyRepository.save(buddy);

        log.info("Service: Buddy updated successfully");

        // 6. 수정 후 필요한 데이터 반환
        BuddyDTO updatedBuddyDTO = new BuddyDTO();
        updatedBuddyDTO.setBuddyCode(buddy.getBuddyCode());
        updatedBuddyDTO.setBuddyTitle(buddy.getBuddyTitle());
        updatedBuddyDTO.setBuddyContents(buddy.getBuddyContents());
        updatedBuddyDTO.setRegionCode(buddy.getRegion().getRegionCode());
        updatedBuddyDTO.setBuddyTypeCode(buddy.getBuddyType().getBuddyTypeCode());
        updatedBuddyDTO.setBuddyImg(buddy.getBuddyImg());

        // 지역 및 버디 유형 목록 추가 반환 (수정 폼에 활용 가능)
        List<Region> regions = regionRepository.findAll();
        List<BuddyType> buddyTypes = buddyTypeRepository.findAll();

        Map<String, Object> response = new HashMap<>();
        response.put("updatedBuddy", updatedBuddyDTO);
        response.put("regions", regions);
        response.put("buddyTypes", buddyTypes);

        log.info("Service: Response data for buddy update: {}", response);

        return response;
    }

    // 게시글 수정폼 이전데이터
    @Transactional
    public Map<String, Object> getBuddyDetailWithLists(int buddyCode) {
        log.info("Service: Fetching buddy detail and related lists for buddyCode {}", buddyCode);

        // 1. 게시글 데이터 조회
        Buddy buddy = myBuddyRepository.findByBuddyCode(buddyCode);
        if (buddy == null) {
            throw new RuntimeException("게시글을 찾을 수 없습니다.");
        }

        // 2. 게시글 데이터를 DTO로 변환
        BuddyDTO buddyDTO = new BuddyDTO();
        buddyDTO.setBuddyCode(buddy.getBuddyCode());
        buddyDTO.setMemberCode(
                buddy.getAccount() != null ? buddy.getAccount().getMemberCode() : null
        ); // Account가 null일 가능성 방어
        buddyDTO.setRegionCode(
                buddy.getRegion() != null ? buddy.getRegion().getRegionCode() : null
        ); // Region이 null일 가능성 방어
        buddyDTO.setBuddyTypeCode(
                buddy.getBuddyType() != null ? buddy.getBuddyType().getBuddyTypeCode() : null
        ); // BuddyType이 null일 가능성 방어
        buddyDTO.setBuddyTitle(buddy.getBuddyTitle());
        buddyDTO.setBuddyContents(buddy.getBuddyContents());
        buddyDTO.setBuddyCreate(
                buddy.getBuddyCreate() != null ? buddy.getBuddyCreate().toString() : null
        ); // 작성일자가 null일 가능성 방어
        buddyDTO.setBuddyStatus(buddy.getBuddyStatus());
        buddyDTO.setBuddyImg(buddy.getBuddyImg());
        buddyDTO.setBuddyCount(buddy.getBuddyCount());
        buddyDTO.setBuddyAt(buddy.getBuddyAt());

        log.info("Service: Converted BuddyDTO {}", buddyDTO);

        // 3. 지역 및 버디 유형 목록 조회
        List<Region> regions = regionRepository.findAll();
        List<BuddyType> buddyTypes = buddyTypeRepository.findAll();

        log.info("Service: Regions fetched: {}", regions);
        log.info("Service: Buddy types fetched: {}", buddyTypes);

        // 4. 결과 데이터 구성
        Map<String, Object> result = new HashMap<>();
        result.put("getBuddyDetail", buddyDTO); // 게시글 데이터
        result.put("regions", regions);        // 지역 전체 목록
        result.put("buddyTypes", buddyTypes);  // 버디 유형 전체 목록

        log.info("Service: Final response data for buddyCode {}: {}", buddyCode, result);

        return result;
    }

    /* 내가쓴버디게시글삭제 */
    @Transactional
    public Object deleteBuddyCode(List<Integer> buddyCodes) {
        log.info("[MypageService] 삭제 시작: buddyCode = {}", buddyCodes);

        myBuddyRepository.deleteByBuddyCode(buddyCodes);

        log.info("[MypageService] 삭제 완료: buddyCode = {}", buddyCodes);

        return "return 게시글 삭제 성공";
    }

    /* 내가 신청한 게시글, 신청상태 조회 */
    public Object selectMatch(int memberCode) {
        log.info("[MypageService] selectMatch() Start");

        List<BuddyMatchData> matchDataList = myBuddyMatchRepository.findByMemberCodeMatch
                (memberCode);
        if (matchDataList.isEmpty()) {
            throw new EntityNotFoundException("No matching data found for memberCode: " + memberCode);
        }

        List<BuddyMatchDataDTO> buddyMatchDataDTOList = new ArrayList<>();
        List<Integer> buddyCodeList = new ArrayList<>();

        for (BuddyMatchData matchData : matchDataList) {
            // DTO로 변환
            BuddyMatchDataDTO buddyMatchDataDTO = new BuddyMatchDataDTO();
            buddyMatchDataDTO.setBuddyMatchCode(matchData.getBuddyMatchCode());
            buddyMatchDataDTO.setBuddyCode(matchData.getBuddy().getBuddyCode());
            buddyMatchDataDTO.setMemberCode(matchData.getAccount().getMemberCode());
            buddyMatchDataDTO.setApplyId(matchData.getApplyId());
            buddyMatchDataDTO.setApplyStatus(matchData.getApplyStatus());
            buddyMatchDataDTOList.add(buddyMatchDataDTO);

            // BuddyCode 수집
            buddyCodeList.add(matchData.getBuddy().getBuddyCode());
        }

        List<Buddy> buddyList = myBuddyRepository.findByBuddyCodeIn(buddyCodeList);
        if (buddyList.isEmpty()) {
            throw new EntityNotFoundException("No buddy found for buddyCodes: " + buddyCodeList);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("buddyMatchDataList", buddyMatchDataDTOList);
        response.put("buddyList", buddyList);

        log.info("[MypageService] selectMatch() End");
        return response;
    }

    /* 신청취소 */
    @Transactional
    public void deleteMatch(int memberCode) {
        log.info("[MypageService] deleteMatch() Start");

        BuddyMatchData buddyMatchData = myBuddyMatchRepository.findByMemberCode(memberCode)
                .orElseThrow(() -> new RuntimeException("BuddyMatchData에 없는 회원코드! 꾀꼬리."));

        myBuddyMatchRepository.delete(buddyMatchData);

        System.out.println("buddyMatchData=============== = " + buddyMatchData);
        log.info("[MypageService] deleteMatch() End");
    }

}
