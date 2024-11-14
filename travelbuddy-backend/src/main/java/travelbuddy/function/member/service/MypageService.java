package travelbuddy.function.member.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.member.repository.MypageRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MypageService {

    private static final Logger log = LoggerFactory.getLogger(MypageService.class);
    private final MypageRepository mypageRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public MypageService(MypageRepository mypageRepository, ModelMapper modelMapper) {
        this.mypageRepository = mypageRepository;
        this.modelMapper = modelMapper;
    }

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
        List<Buddy> selectBuddyList = mypageRepository.findByMemberCode();

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

//    public Object getBuddyDetail(int buddyCode) {
//        log.info("[MypageService] getBuddyDetail() Start");
//
//        Buddy buddy = mypageRepository.findById(buddyCode).get();
//
//        return 0;
//    }
}
