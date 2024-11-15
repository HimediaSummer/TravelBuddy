package travelbuddy.function.community.buddy.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.entity.Buddy;
import org.springframework.data.domain.Pageable;
import travelbuddy.function.community.buddy.repository.BuddyRepository;

import java.util.List;
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


    public Object selectBuddyListWithPaging(Criteria criteria) {

        log.info("[BuddyService] selectBuddyListWithPaging() Start");

        int index = criteria.getPageNum() -1;
        int count = criteria.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("buddyCode").descending());

        Page<Buddy> result = buddyRepository.findByBuddyStatus("N", paging);
//        Page<Buddy> result = buddyRepository.findAll(paging);
        List<Buddy> buddyList = (List<Buddy>) result.getContent();

        for(int i = 0 ; i < buddyList.size() ; i++) {
            buddyList.get(i).setBuddyTitle(buddyList.get(i).getBuddyTitle());
        }

        log.info("[BuddyService] selectBuddyListWithPaging() END");

        return buddyList.stream().map(buddy -> modelMapper.map(buddy, BuddyDTO.class)).collect(Collectors.toList());
    }

//    public Object selectBuddyListWithPaging() {
//        log.info("[MypageService] selectBuddyList() Start");
//        List<Buddy> selectBuddyList = buddyRepository.findByMemberCode();
//
//        System.out.println("selectBuddyList = " + selectBuddyList);
//
//        List<BuddyDTO> buddyList = selectBuddyList.stream()
//                .map(buddy -> {
//                    BuddyDTO buddyDto = modelMapper.map(buddy, BuddyDTO.class);
//
//                    // account.memberCode -> BuddyDTO.memberCode 매핑
//                    if (buddy.getMemberCode() != null) {
//                        buddyDto.setMemberCode(buddy.getMemberCode().getMemberCode());
//                    } return buddyDto;
//                })
//                .collect(Collectors.toList());
//
//        log.info("[MypageService] selectMypagePostList() END");
//
//        return buddyList;
//    }


}
