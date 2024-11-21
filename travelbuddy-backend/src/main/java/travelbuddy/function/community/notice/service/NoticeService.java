package travelbuddy.function.community.notice.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.notice.controller.NoticeController;
import travelbuddy.function.community.notice.dto.NoticeDTO;
import travelbuddy.function.community.notice.entity.Notice;
import travelbuddy.function.community.notice.repository.NoticeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoticeService {

    private static final Logger log = LoggerFactory.getLogger(NoticeService.class);
    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;

    public NoticeService(ModelMapper modelMapper, NoticeRepository noticeRepository) {
        this.modelMapper = modelMapper;
        this.noticeRepository = noticeRepository;
    }

    /*Notice 리스트의 총 합을 구한다.*/
    public int selectNoticeTotal() {
        log.info("[NoticeService] selectNoticeTotal start");

        List<Notice> noticeList = noticeRepository.findAll();

        log.info("[NoticeService] selectNoticeTotal end");

        return noticeList.size();

    }

    /*Notice 리스트와 paging 처리를 함께 한다.*/
    public Object selectNoticeListWithPaging(Criteria cri) {

        log.info("[NoticeService] selectNoticeListWithPaging start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("noticeCode").descending());

        Page<Notice> result = noticeRepository.findAll(paging);
        List<Notice> noticeList = (List<Notice>)result.getContent();

        log.info("[NoticeService] selectNoticeListWithPaging end");

        return noticeList.stream().map((element) -> modelMapper.map(element, NoticeDTO.class)).collect(Collectors.toList());

    }

    /*공지 1개를 상세 조회한다.*/
    public NoticeDTO selectNotice(int noticeCode) {
        log.info("[NoticeService] selectNotice() start");

        Notice notice = noticeRepository.findById(noticeCode).orElse(null);

        log.info("[NoticeService] selectNotice() end");

        return modelMapper.map(notice , NoticeDTO.class);
    }
}
