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
//import travelbuddy.common.Criteria;
import travelbuddy.function.community.buddy.dto.BuddyDTO;
import travelbuddy.function.member.dto.MemberBuddyDataDTO;
import travelbuddy.function.member.entity.MemberBuddyData;
import travelbuddy.function.member.repository.MypageRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MypageService {

//    private static final Logger log = LoggerFactory.getLogger(MypageService.class);
//    private final MypageRepository mypageRepository;
//    private final ModelMapper modelMapper;
//
//    @Autowired
//    public MypageService(MypageRepository mypageRepository, ModelMapper modelMapper) {
//        this.mypageRepository = mypageRepository;
//        this.modelMapper = modelMapper;
//    }
//
//    public int selectMypagePostTotal() {
//        log.info("[MypageService] selectMyPostTotal() Start");
//        List<MemberBuddyData> mypagePostList = mypageRepository.findByMemberCode(1001);
//        log.info("[MypageService] selectMyPostTotal()끝");
//        return mypagePostList.size();
//    }
//
//    public Object selectMypagePostList(Criteria cri) {
//        log.info("[MypageService] selectMyPostList Start11");
//
//        int index = cri.getPageNum() -1;
//        int count = cri.getAmount();
//        Pageable paging = PageRequest.of(index, count, Sort.by("buddyCode").descending());
//
//        Page<MemberBuddyData> result = mypageRepository.findByMemberCode(1001, paging);
//        List<MemberBuddyData> mypagePostList = (List<MemberBuddyData>)result.getContent();
//
//        log.info("[MypageService] selectMypagePostList End");
//        return mypagePostList.stream().map(mypagePost -> modelMapper.map(mypagePost, MemberBuddyDataDTO.class)).collect(Collectors.toList());
//    }


//    public Object selectMypagePostDetail(int buddyCode) {
//    }
}
