package travelbuddy.function.admin.service;

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
import travelbuddy.function.admin.repository.AdminNoticeRepository;
import travelbuddy.function.community.notice.controller.NoticeController;
import travelbuddy.function.community.notice.dto.NoticeDTO;
import travelbuddy.function.community.notice.entity.Notice;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminNoticeService {

    private static final Logger log = LoggerFactory.getLogger(NoticeController.class);
    private final AdminNoticeRepository adminNoticeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminNoticeService(AdminNoticeRepository adminNoticeRepository, ModelMapper modelMapper) {
        this.adminNoticeRepository = adminNoticeRepository;
        this.modelMapper = modelMapper;
    }

    /*Notice 리스트의 총 합을 구한다.*/
    public int selectNoticeTotal() {
        log.info("[AdminNoticeService] selectNoticeTotal start");

        List<Notice> noticeList = adminNoticeRepository.findAll();

        log.info("[AdminNoticeService] selectNoticeTotal end");

        return noticeList.size();

    }

    /*Notice 리스트와 paging 처리를 함께 한다.*/
    public Object selectNoticeListWithPaging(Criteria cri) {

        log.info("[AdminNoticeService] selectNoticeListWithPaging start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("noticeCode").descending());

        Page<Notice> result = adminNoticeRepository.findAll(paging);
        List<Notice> noticeList = (List<Notice>)result.getContent();

        log.info("[AdminNoticeService] selectNoticeListWithPaging end");

        return noticeList.stream().map((element) -> modelMapper.map(element, NoticeDTO.class)).collect(Collectors.toList());

    }

    /*공지 1개를 상세 조회한다.*/
    public NoticeDTO selectNotice(int noticeCode) {
        log.info("[AdminNoticeService] selectNotice() start");

        Notice notice = adminNoticeRepository.findById(noticeCode).orElse(null);

        log.info("[AdminNoticeService] selectNotice() end");

        return modelMapper.map(notice , NoticeDTO.class);
    }

    /*공지 1개를 등록한다.*/
    @Transactional
    public Object insertNotice(NoticeDTO noticeDTO) {
        log.info("[AdminNoticeService] insertNotice() start");

        Notice newNotice = modelMapper.map(noticeDTO, Notice.class);
        adminNoticeRepository.save(newNotice);

        log.info("[AdminNoticeService] insertNotice() end");

        return modelMapper.map(newNotice, NoticeDTO.class);
    }

    /*공지 1개를 수정한다.*/
    @Transactional
    public Object updateNotice(int noticeCode, NoticeDTO noticeDTO) {

        log.info("[AdminNoticeService] updateNotice() start");

        Notice updateNotice = adminNoticeRepository.findById(noticeCode).orElse(null);
        updateNotice.setNoticeContents(noticeDTO.getNoticeContents());
        updateNotice.setNoticeCreate(noticeDTO.getNoticeCreate());
        adminNoticeRepository.save(updateNotice);

        log.info("[AdminNoticeService] updateNotice() end");

        return modelMapper.map(updateNotice, NoticeDTO.class);

    }

    /*공지 1개를 삭제한다.*/
    @Transactional
    public Object deleteNotice(int noticeCode) {

        log.info("[AdminNoticeService] deleteNotice() start");

        int result = 0;
        Notice notice = adminNoticeRepository.findById(noticeCode).orElse(null);
        if (notice != null) {
            adminNoticeRepository.delete(notice);
            result = 1;
        }

        log.info("[AdminNoticeService] deleteNotice() end");

        return (result > 0) ? "삭제 성공" : "삭제 실패";

    }
}
