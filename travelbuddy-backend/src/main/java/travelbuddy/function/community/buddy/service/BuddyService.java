package travelbuddy.function.community.buddy.service;

import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.dto.BuddyMatchDataDTO;
import travelbuddy.function.community.buddy.entity.Buddy;
import org.springframework.data.domain.Pageable;
import travelbuddy.function.community.buddy.entity.BuddyMatchData;
import travelbuddy.function.community.buddy.entity.BuddyType;
import travelbuddy.function.community.buddy.repository.BuddyMatchDataRepository;;
import travelbuddy.function.community.buddy.repository.BuddyRepository;
import travelbuddy.function.community.buddy.repository.BuddyTypeRepository;
import travelbuddy.function.member.entity.Account;
import travelbuddy.function.member.repository.AccountRepository;
import travelbuddy.function.member.repository.MemberRepository;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.repository.RegionRepository;
import travelbuddy.util.FileUploadUtils;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BuddyService {

    private static final Logger log = LoggerFactory.getLogger(BuddyService.class);
    private final BuddyRepository buddyRepository;
    private final BuddyTypeRepository buddyTypeRepository;
    private final ModelMapper modelMapper;
    private final AccountRepository accountRepository;
    private final MemberRepository memberRepository;
    private final RegionRepository regionRepository;
    private final BuddyMatchDataRepository buddyMatchDataRepository;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public BuddyService(BuddyMatchDataRepository buddyMatchDataRepository, BuddyRepository buddyRepository, ModelMapper modelMapper, BuddyTypeRepository buddyTypeRepository, AccountRepository accountRepository, MemberRepository memberRepository, RegionRepository regionRepository) {
        this.buddyMatchDataRepository = buddyMatchDataRepository;
        this.buddyRepository = buddyRepository;
        this.modelMapper = modelMapper;
        this.buddyTypeRepository = buddyTypeRepository;
        this.accountRepository = accountRepository;
        this.memberRepository = memberRepository;
        this.regionRepository = regionRepository;
    }


    public int selectBuddyTotal() {
        log.info("[BuddyService] selectBuddyTotal() Start");

//        List<Buddy> buddyList = buddyRepository.findByBuddyStatus("N");
        List<Buddy> buddyList = buddyRepository.findAll();

        log.info("[BuddyService] selectBuddyTotal() END");

        return buddyList.size();
    }


    public Object selectBuddyListWithPaging(Criteria criteria) {

        log.info("[BuddyService] selectBuddyListWithPaging() Start");

        int index = criteria.getPageNum() -1;
        int count = criteria.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("buddyCode").descending());
        System.out.println("버디서비스 영역의 paging = " + paging);


//        Page<Buddy> result = buddyRepository.findByBuddyStatus("N", paging);
        Page<Buddy> result = buddyRepository.findAll(paging);
        System.out.println("버디서비스영역의 result = " + result);
//        Page<Buddy> result = buddyRepository.findAll(paging);
        List<Buddy> buddyList = result.getContent();
        System.out.println("buddyList = " + buddyList);


//        for(int i = 0 ; i < buddyList.size() ; i++) {
//            buddyList.get(i).setBuddyTitle(buddyList.get(i).getBuddyTitle());
//        }


        log.info("[BuddyService] selectBuddyListWithPaging() END");

//        return buddyList.stream().map(element -> modelMapper.map(element, BuddyDTO.class)).collect(Collectors.toList());
        return buddyList;
//        return  buddyList.stream().map(buddy -> {
//            BuddyDTO buddyDTO = modelMapper.map(buddy, BuddyDTO.class);
//            if (buddy.getAccount() != null) {
//                buddyDTO.setMemberCode(buddy.getAccount().getMemberCode());
//            }
//            return buddyDTO;
//        }).collect(Collectors.toList());
    }

//    public Object selectSearchBuddyList(String search) {
//        log.info("[ProductService] selectSearchProductList() Start");
//        log.info("[ProductService] searchValue : {}", search);
//
//        List<Buddy> buddyListWithSearchValue = buddyRepository.findByProductNameContaining(search);
//
//        log.info("[ProductService] buddyListWithSearchValue : {}", buddyListWithSearchValue);
//
////        for(int i = 0 ; i < buddyListWithSearchValue.size() ; i++) {
////            buddyListWithSearchValue.get(i).setProductImageUrl(IMAGE_URL + buddyListWithSearchValue.get(i).getProductImageUrl());
////        }
//
//        log.info("[ProductService] selectSearchProductList() End");
//
//        return buddyListWithSearchValue.stream().map(product -> modelMapper.map(product, BuddyDTO.class)).collect(Collectors.toList());
//    }

    public Object selectBuddyDetail(int buddyCode) {
        log.info("[BuddyService] selectBuddyDetail() Start");


        Buddy buddy = buddyRepository.findById(buddyCode).get();

//        Account account = accountRepository.findById(buddy.getAccount().getMemberCode()).get();
//        buddy.setAccount(account);
        buddy.setBuddyImg(IMAGE_URL + buddy.getBuddyImg());
//        buddy.setAccount(account);
//        buddyRepository.save(buddy);
//        BuddyDTO buddyDTO = modelMapper.map(buddy, BuddyDTO.class);
//        if(buddy.getAccount() != null) {
//            buddyDTO.setMemberCode(buddy.getAccount().getMemberCode());
//        }

//        Region region = regionRepository.findById(buddyDTO.getRegionCode()).get();
//
//        BuddyType buddyType = buddyTypeRepository.findById(buddyDTO.getBuddyTypeCode()).get();


        log.info("[BuddyService} selectBuddyDetail() END");

//        return modelMapper.map(buddy, Buddy.class);
//        return buddyDTO;
        return  buddy;
    }

    @Transactional
    public Object insertBuddy(BuddyDTO buddyDTO, MultipartFile buddyImage) {
        log.info("[BuddyService] insertBuddy() Start");
        log.info("[BuddyService] buddy: {}", buddyDTO);

        String imageName = UUID.randomUUID().toString().replace("-", "");
        String replaceFileName = null;
        ModelMapper modelMapper = new ModelMapper();
        int result = 0;

        try {

            if(buddyImage != null && !buddyImage.isEmpty()) {
                /* 설명. util 패키지에 FileUploadUtils 추가 */
                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, buddyImage);

                buddyDTO.setBuddyImg(replaceFileName); // 업로드한 파일 이름 설정

                log.info("[ProductService] insert Image Name : {}", replaceFileName);

            } else  {
                buddyDTO.setBuddyImg(null);
            }

            Buddy insertBuddy = modelMapper.map(buddyDTO, Buddy.class);

            BuddyType buddyType = buddyTypeRepository.findById(buddyDTO.getBuddyTypeCode()).get();
//            if(buddyType != null ) {
//                buddyDTO.setBuddyTypeName(buddyType.getBuddyTypeName());
//            }
            insertBuddy.setBuddyType(buddyType);
            log.info("buddyType = " + buddyType);

            Region region = regionRepository.findById(buddyDTO.getRegionCode()).get();
//            if(region != null) {
//                buddyDTO.setRegionName(region.getRegionName());
//            }
            insertBuddy.setRegion(region);
            log.info("region = " + region);


            Account account = accountRepository.findById(buddyDTO.getMemberCode()).get();
            insertBuddy.setAccount(account);
            log.info("account = " + account);

            insertBuddy.setBuddyCreate(LocalDateTime.now().toString());

            buddyRepository.save(insertBuddy);

            result = 1;
        } catch (Exception e) {
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
        }

        return (result > 0 ) ? "버디게시글 등록 성공" : "게시글 등록 실패";
//        return modelMapper.map(buddy , BuddyDTO.class);
    }

    @Transactional
    public Object updateBuddy(BuddyDTO buddyDTO, MultipartFile buddyImage) {
        log.info("[BuddyService] insertBuddy() Start");
        log.info("[BuddyService] buddy: {}", buddyDTO);

        String  replaceFileName = null;
        int result = 0;

        try {
            Buddy buddy = buddyRepository.findById(buddyDTO.getBuddyCode()).get();
            String oriImage = buddy.getBuddyImg();
            log.info("[upadteBuddy] oriImage : {}", oriImage);

            BuddyType buddyType = buddyTypeRepository.findById(buddyDTO.getBuddyTypeCode()).get();
            buddy.setBuddyType(buddyDTO.getBuddyTypeCode());
            log.info("buddyType = " + buddyType);

            Region region = regionRepository.findById(buddyDTO.getRegionCode()).get();
            buddy.setRegion(buddyDTO.getRegionCode());
            log.info("region = " + region);


            Account account = accountRepository.findById(buddyDTO.getMemberCode()).get();
            buddy.setAccount(account);
            log.info("account = " + account);

//            buddy.setBuddyType(buddyDTO.getBuddyTypeCode());
//            buddy.setRegion(buddyDTO.getRegionCode());
            buddy.setBuddyTitle(buddyDTO.getBuddyTitle());
            buddy.setBuddyContents(buddyDTO.getBuddyContents());
            buddy.setBuddyImg(buddyDTO.getBuddyImg());
            buddy.setBuddyStatus(buddyDTO.getBuddyStatus());
            buddy.setBuddyAt(buddyDTO.getBuddyAt());
            buddy.setBuddyCreate(buddyDTO.getBuddyCreate());

            if(buddyImage != null) {
                String imageName = UUID.randomUUID().toString().replace("-","");
                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, buddyImage);
                log.info("[updateBuddy] InsertFileName : {}" , replaceFileName);

                buddy.setBuddyImg(replaceFileName);
                log.info("[upsateBuddy] deleteImage : {}", oriImage);

                boolean isDelete = FileUploadUtils.deleteFile(IMAGE_DIR, oriImage);
                log.info("[update[ isDelete : {}", isDelete);
            } else {

                //이미지 변동 없을 경우
                buddy.setBuddyImg(oriImage);
            }
            log.info("[BuddyService] updateBuddy END");

            result = 1;
            return buddy;
        } catch (IOException e) {
            log.info("[updateBuddy] Exception!!");
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
        }

//        return (result > 1 ) ? "상품 업데이트 성공" : "상품 업데이트 실패";

    }

    @Transactional
    public void deleteBuddy(int buddyCode) {
        log.info("[BuddyService] deleteBuddy() Start");

        Buddy buddy = buddyRepository.findById(buddyCode)
                .orElseThrow(() -> new RuntimeException("삭제할 게시글을 찾을 수 없습니다."));

        buddyRepository.delete(buddy);

        buddyRepository.updateBuddyCodesAfterDelete(buddyCode);

        // 최대 buddy_code 값을 조회
        Integer maxBuddyCode = buddyRepository.findMaxBuddyCode();

        // AUTO_INCREMENT 값을 현재 최대값 + 1로 재설정
        if (maxBuddyCode != null) {
            buddyRepository.resetAutoIncrement(maxBuddyCode + 1);
        } else {
            // 테이블이 비어있는 경우 1로 설정
            buddyRepository.resetAutoIncrement(1);
        }

        log.info("[BuddyService] deleteBuddy() End");
    }

    public Object selectSearchBuddyList(String search) {

        List<Buddy> buddyListWithSearchValue = buddyRepository.buddyTitleContaining(search);

        return buddyListWithSearchValue.stream().map(Buddy -> modelMapper.map(Buddy, BuddyDTO.class)).collect(Collectors.toList());
    }

    @Transactional
    public void applyBuddy(BuddyMatchDataDTO buddyMatchDataDTO) {

        BuddyMatchData matchData = modelMapper.map(buddyMatchDataDTO, BuddyMatchData.class);

        Buddy buddy = buddyRepository.findById(buddyMatchDataDTO.getBuddyCode()).get();
        matchData.setBuddy(buddy);

        Account account = accountRepository.findById(buddyMatchDataDTO.getMemberCode()).get();
        matchData.setAccount(account);

        matchData.setApplyId(buddyMatchDataDTO.getApplyId());
        matchData.setApplyStatus(buddyMatchDataDTO.getApplyStatus());

        buddyMatchDataRepository.save(matchData);

    }


    public List<Map<String, String>> getBuddyTypes() {
        List<BuddyType> buddyTypes = buddyTypeRepository.findAll();

        // 필요한 데이터만 매핑
        return buddyTypes.stream()
                .map(type -> {
                    Map<String, String> typeData = new HashMap<>();
                    typeData.put("buddyTypeCode", String.valueOf(type.getBuddyTypeCode()));
                    typeData.put("buddyTypeName", type.getBuddyTypeName());
                    return typeData;
                })
                .collect(Collectors.toList());
    }

    public List<Map<String, String>> getRegions() {
        List<Region> regions = regionRepository.findAll();

        // 필요한 데이터만 매핑
        return regions.stream()
                .map(region -> {
                    Map<String, String> regionData = new HashMap<>();
                    regionData.put("regionCode", String.valueOf(region.getRegionCode()));
                    regionData.put("regionName", region.getRegionName());
                    return regionData;
                })
                .collect(Collectors.toList());
    }
}
