package travelbuddy.function.member.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import java.io.File;
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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.dto.BuddyMatchDataDTO;
import travelbuddy.function.community.buddy.dto.BuddyTypeDTO;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.community.buddy.entity.BuddyMatchData;
import travelbuddy.function.community.buddy.entity.BuddyType;
import travelbuddy.function.community.buddy.repository.BuddyTypeRepository;
import travelbuddy.function.member.dto.AccountDTO;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.*;
import travelbuddy.function.schedule.dto.RegionDTO;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.AccommodationRepository;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.util.FileUploadUtils;

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
    private final AccountRepository accountRepository;
    private final AccommodationRepository accommodationRepository;
    private final MemberAnswerRepository memberAnswerRepository;
    private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public MypageService(MyBuddyRepository myBuddyRepository, MyBuddyMatchRepository myBuddyMatchRepository, MyProfileRepository myProfileRepository, BuddyTypeRepository buddyTypeRepository, RegionRepository regionRepository, MyScheduleRepository myScheduleRepository, AccountRepository accountRepository, AccommodationRepository accommodationRepository, MemberAnswerRepository memberAnswerRepository, ModelMapper modelMapper) {
        this.myBuddyRepository = myBuddyRepository;
        this.myBuddyMatchRepository = myBuddyMatchRepository;
        this.myProfileRepository = myProfileRepository;
        this.buddyTypeRepository = buddyTypeRepository;
        this.regionRepository = regionRepository;
        this.myScheduleRepository = myScheduleRepository;
        this.accountRepository = accountRepository;
        this.accommodationRepository = accommodationRepository;
        this.memberAnswerRepository = memberAnswerRepository;
        this.modelMapper = modelMapper;
    }

    /* =========================================== My정보 =========================================== */
    /* 회원정보조회 */
    public Object selectMyProfile() {
        log.info("[MypageService] selectMyProfile() Start");

        List<Account> accountMyProfile = myProfileRepository.findById();

        accountMyProfile.forEach(account ->
                account.setMemberImg(account.getMemberImg() == null ? null : IMAGE_URL + account.getMemberImg())
        );

        log.info("[MypageService] selectMyProfile() END");
        return accountMyProfile.stream().map(account -> modelMapper.map(account, AccountDTO.class)).collect(Collectors.toList());
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
                File dest = new File("C:/HiFinalProject/TravelBuddy/travelbuddy-backend/memberimgs/" + randomFileName);

                // 파일 저장
                profileImg.transferTo(dest);
                log.info("File saved successfully to!!!!!!!!!!!!!!!!!!!!!!! {}", dest.getAbsolutePath());
                log.info("[updateMyProfile] 새 파일 저장 완료: {}", randomFileName);

                // 기존 파일 삭제 (default.png는 제외)
                if (oldImage != null && !oldImage.equals("default.png")) {
                    File oldFile = new File("C:/HiFinalProject/TravelBuddy/travelbuddy-backend/memberimgs/" + oldImage);
                    if (oldFile.exists() && oldFile.delete()) {
                        log.info("[updateMyProfile] 기존 파일 삭제 완료: {}", oldImage);
                    } else {
                        log.warn("[updateMyProfile] 기존 파일 삭제 실패: {}", oldImage);
                    }
                }

            } catch (IOException e) {
                log.error("[updateMyProfile] 파일 저장 중 오류 발생", e);
                throw new RuntimeException("파일 저장 중 오류 발생", e);
            }
        }
        // 기본값 설정: accountDTO의 값이 비어 있으면 기존 account의 값을 유지
        if (accountDTO.getMemberEmail() == null || accountDTO.getMemberEmail().trim().isEmpty()) {
            accountDTO.setMemberEmail(account.getMemberEmail());
        }
        if (accountDTO.getMemberFullName() == null || accountDTO.getMemberFullName().trim().isEmpty()) {
            accountDTO.setMemberFullName(account.getMemberFullName());
        }
        if (accountDTO.getMemberPhone() == null || accountDTO.getMemberPhone().trim().isEmpty()) {
            accountDTO.setMemberPhone(account.getMemberPhone());
        }
        if (accountDTO.getMemberPassword() == null || accountDTO.getMemberPassword().trim().isEmpty()) {
            accountDTO.setMemberPassword(account.getMemberPassword());
        }
        if (accountDTO.getMemberName() == null || accountDTO.getMemberName().trim().isEmpty()) {
            accountDTO.setMemberName(account.getMemberName());
        }

        // 5. 새로운 이미지 파일 이름 저장
        if (randomFileName != null) {
            account.setMemberImg(randomFileName);
        }

        myProfileRepository.save(account);

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
    public int selectScheTotal() {
        log.info("[MyService] selectScheTotal() Start");
        int memberCode = 1002;
        int total = myBuddyRepository.countByMemberCode(memberCode);

        return total;
    }

    // Schedule 목록 페이징
    public List<Map<String, Object>> selectMyScheListPaging(Criteria cri) {
        log.info("[MyService] selectMyScheListPaging() Start");

        int memberCode = 1002;
        int index = cri.getPageNum() - 1;
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

    /* 일정 재생성 */
    @Transactional
    public Schedule recreateSchedule(int memberCode, int scheCode, ScheduleDTO newScheduleData) {
        log.info("[mypageService] recreateSchedule() Start");
        Schedule existingSchedule = myScheduleRepository.findById(scheCode)
                .orElseThrow(() -> new RuntimeException("삭제할 스케줄을 찾을 수 없습니다."));

        myScheduleRepository.delete(existingSchedule);
        log.info("기존 스케줄 삭제 완료: {}", scheCode);

        Schedule newSchedule = new Schedule();
        newSchedule.setScheCode(newScheduleData.getScheCode());
        newSchedule.setRegion(regionRepository.findById(newScheduleData.getRegionCode()).orElseThrow(() -> new NoSuchElementException("Region with ID " + newScheduleData.getRegionCode() + " not found in the database")));
        newSchedule.setAccommodation(accommodationRepository.findById(newScheduleData.getAccomCode()).orElseThrow(() -> new NoSuchElementException("Accom not found")));
        newSchedule.setAccount(accountRepository.findById(newScheduleData.getMemberCode()).orElseThrow(() -> new NoSuchElementException("Member not found")));
        newSchedule.setMemberAnswer(memberAnswerRepository.findById(newScheduleData.getMemberAnswerCode()).orElseThrow(() -> new NoSuchElementException("Answer not found")));
        newSchedule.setScheList(newScheduleData.getScheList());
        newSchedule.setScheStartDate(newScheduleData.getScheStartDate());
        newSchedule.setScheEndDate(newScheduleData.getScheEndDate());
        newSchedule.setScheStartTime(newScheduleData.getScheStartTime());
        newSchedule.setScheEndTime(newScheduleData.getScheEndTime());
        newSchedule.setTravelTime(newScheduleData.getTravelTime());
        newSchedule.setScheTime(newScheduleData.getScheTime());

        myScheduleRepository.save(newSchedule);
        log.info("새 일정 만들어지나?: {}", scheCode);

        log.info("[mypageService] recreateSchedule() End");
        return newSchedule;
    }



    /* =========================================== My커뮤니티 =========================================== */
    public int selectBuddyTotal() {
        log.info("[MyService] selectBuddyListTotal() Start");
        int memberCode = 1002;
        int total = myBuddyRepository.countByMemberCode(memberCode);

        return total;
    }

    // Buddy 목록 페이징
    public List<Map<String, Object>> selectBuddyListPaging(Criteria cri) {
        log.info("[MyService] selectBuddyListPaging() Start");

        int memberCode = 1002;
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


        log.info("[AdminAccountService] selectMemberListWithPaging() End");
        return buddyList;
    }






    /* 내가쓴버디게시글조회 */
//    public List<Map<String, Object>> selectBuddyList(int memberCode) {
//        log.info("[MypageService] selectBuddyList() Start");
//        System.out.println("text memberbuddy" + memberCode);
//
//        List<Object[]> results = myBuddyRepository.findAllByAccount(memberCode);
//
//        List<Map<String, Object>> buddyList = new ArrayList<>();
//        for (Object[] result : results) {
//            Map<String, Object> buddyMap = new HashMap<>();
//            Buddy buddy = (Buddy) result[0];
//            String regionName = (String) result[1];
//            String buddyTypeName = (String) result[2];
//            String memberName = (String) result[3];
//            buddyMap.put("buddyTitle", buddy.getBuddyTitle());
//            buddyMap.put("buddyCode", buddy.getBuddyCode());
//            buddyMap.put("buddyCreate", buddy.getBuddyCreate());
//            buddyMap.put("buddyStatus", buddy.getBuddyStatus());
//            buddyMap.put("buddyCount", buddy.getBuddyCount());
//            buddyMap.put("memberName", memberName);
//            buddyMap.put("regionName", regionName);
//            buddyMap.put("buddyTypeName", buddyTypeName);
//
//            buddyList.add(buddyMap);
//        }
//
//        log.info("[MypageService] selectBuddyList() End");
//        return buddyList;
//    }


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
        buddyDTO.setBuddyImg(getBuddyDetail.getBuddyImg());
        buddyDTO.setBuddyCount(getBuddyDetail.getBuddyCount());
        buddyDTO.setBuddyAt(getBuddyDetail.getBuddyAt());

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
        myBuddyMatchRepository.save(matchDataToUpdate);;
        log.info("[MypageService] updateBuddyApplyStatus() End");
    }

    /* 내가쓴버디게시글수정 */
    // 게시글 수정시 이전데이터 가져오기
    @Transactional
    public Map<String, Object> updateBuddy(int buddyCode, BuddyDTO buddyDTO, MultipartFile buddyImg) {
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
//        if (buddyImg != null && !buddyImg.isEmpty()) {
//            // 이미지 파일 저장 로직 추가 (예: 파일 경로 저장)
//            String imagePath = fileService.saveFile(buddyImg);
//            buddy.setBuddyImg(imagePath);
//        }

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

    // 게시글 수정폼
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
