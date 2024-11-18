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
import travelbuddy.function.community.buddy.entity.Buddy;
import org.springframework.data.domain.Pageable;
import travelbuddy.function.community.buddy.repository.BuddyRepository;
import travelbuddy.util.FileUploadUtils;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BuddyService {

    private static final Logger log = LoggerFactory.getLogger(BuddyService.class);
    private final BuddyRepository buddyRepository;
    private final ModelMapper modelMapper;

    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public BuddyService(BuddyRepository buddyRepository, ModelMapper modelMapper) {
        this.buddyRepository = buddyRepository;
        this.modelMapper = modelMapper;
    }


    public int selectBuddyTotal() {
        log.info("[BuddyService] selectBuddyTotal() Start");

        List<Buddy> buddyList = buddyRepository.findByBuddyStatus("N");
//        List<Buddy> buddyList = buddyRepository.findAll();

        log.info("[BuddyService] selectBuddyTotal() END");

        return buddyList.size();
    }


    public List<BuddyDTO> selectBuddyListWithPaging(Criteria criteria) {

        log.info("[BuddyService] selectBuddyListWithPaging() Start");

        int index = criteria.getPageNum() -1;
        int count = criteria.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("buddyCode").descending());
        System.out.println("버디서비스 영역의 paging = " + paging);


        Page<Buddy> result = buddyRepository.findByBuddyStatus("N", paging);
        System.out.println("버디서비스영역의 result = " + result);
//        Page<Buddy> result = buddyRepository.findAll(paging);
        List<Buddy> buddyList = (List<Buddy>) result.getContent();
        System.out.println("buddyList = " + buddyList);


        for(int i = 0 ; i < buddyList.size() ; i++) {
            buddyList.get(i).setBuddyTitle(buddyList.get(i).getBuddyTitle());
        }

        log.info("[BuddyService] selectBuddyListWithPaging() END");

//        return buddyList.stream().map(buddy -> modelMapper.map(buddy, BuddyDTO.class)).collect(Collectors.toList());
        return  buddyList.stream().map(buddy -> {
            BuddyDTO buddyDTO = modelMapper.map(buddy, BuddyDTO.class);
            if (buddy.getAccount() != null) {
                buddyDTO.setMemberCode(buddy.getAccount().getMemberCode());
            }
            return buddyDTO;
        }).collect(Collectors.toList());
    }

    public Object selectBuddyDetail(int buddyCode) {
        log.info("[BuddyService] selectBuddyDetail() Start");

        Buddy buddy = buddyRepository.findById(buddyCode).get();
        buddy.setBuddyImg(IMAGE_URL + buddy.getBuddyImg());

        log.info("[BuddyService} selectBuddyDetail() END");

        return modelMapper.map(buddy, Buddy.class);
    }

    @Transactional
    public Object insertBuddy(BuddyDTO buddyDTO, MultipartFile buddyImage) {
        log.info("[BuddyService] insertBuddy() Start");
        log.info("[BuddyService] buddy: {}", buddyDTO);

        String imageName = UUID.randomUUID().toString().replace("-","");
        String replaceFileName = null;
        int result = 0;

        try{
            replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, buddyImage);

            buddyDTO.setBuddyImg(replaceFileName);

            log.info("[BuddyService] insert Image Name : {}", replaceFileName);

            Buddy insertBuddy = modelMapper.map(buddyDTO, Buddy.class);

            buddyRepository.save(insertBuddy);

            result = 1;
        } catch (Exception e) {
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
        }

        return (result > 0 ? "버디게시글 등록 성공" : "버디게시글 등록 실패");
    }

////    @Transactional
////    public Object updateBuddy(BuddyDTO buddyDTO, MultipartFile productImage) {
////        log.info("[BuddyService] insertBuddy() Start");
////        log.info("[BuddyService] buddy: {}", buddyDTO);
////
////        String  replaceFileName = null;
////        int result = 0;
////
////        try {
////            Buddy buddy = buddyRepository.findById(buddyDTO.getBuddyCode()).get();
////            String oriImage = buddy.getBuddyImg();
////            log.info("[upadteBuddy] oriImage : {}", oriImage);
////
////            buddy.setBuddyType((buddyDTO.getBuddyTypeCode()));
////            buddy.setRegion(buddyDTO.getRegionCode());
////            buddy.setBuddyTitle(buddyDTO.getBuddyTitle());
////            buddy.setBuddyContents(buddyDTO.getBuddyContents());
////            buddy.setBuddyImg(buddyDTO.getBuddyImg());
////            buddy.setBuddyStatus(buddyDTO.getBuddyStatus());
////            buddy.setBuddyAt(buddyDTO.getBuddyAt());
////        }
//    }
}
