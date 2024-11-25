package travelbuddy.function.admin.service;

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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import travelbuddy.common.Criteria;
import travelbuddy.function.admin.repository.AdminUseInfoRepository;
import travelbuddy.function.community.notice.dto.NoticeDTO;
import travelbuddy.function.community.notice.entity.Notice;
import travelbuddy.function.community.useinfo.dto.UseinfoDTO;
import travelbuddy.function.community.useinfo.entity.Useinfo;
import travelbuddy.util.FileUploadUtils;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class AdminUseInfoService {

    private static final Logger log = LoggerFactory.getLogger(AdminUseInfoService.class);
    private final AdminUseInfoRepository adminUseInfoRepository;
    private final ModelMapper modelMapper;

    /* 설명. 이미지 파일 저장 경로와 응답용 URL (WebConfig 설정파일 추가하기) */
    @Value("${image.image-dir}")
    private String IMAGE_DIR;
    @Value("${image.image-url}")
    private String IMAGE_URL;

    @Autowired
    public AdminUseInfoService(AdminUseInfoRepository adminUseInfoRepository, ModelMapper modelMapper) {
        this.adminUseInfoRepository = adminUseInfoRepository;
        this.modelMapper = modelMapper;
    }

    /* 설명서 리스트의 총 합을 구한다.*/
    public int selectUseInfoTotal() {

        log.info("[AdminUseInfoService] selectUseInfoTotal start");

        List<Useinfo> useInfoList = adminUseInfoRepository.findAll();

        log.info("[AdminUseInfoService] selectUseInfoTotal end");

        return useInfoList.size();

    }

    /*설명서 리스트와 paging 처리를 함께 한다.*/
    public Object selectUseInfoListWithPaging(Criteria cri) {

        log.info("[AdminUseInfoService] selectUseInfoListWithPaging start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("useinfoCode").descending());

        Page<Useinfo> result = adminUseInfoRepository.findAll(paging);
        List<Useinfo> useInfoList = (List<Useinfo>)result.getContent();

        log.info("[AdminUseInfoService] selectUseInfoListWithPaging end");

        return useInfoList.stream().map((element) -> modelMapper.map(element, UseinfoDTO.class)).collect(Collectors.toList());
    }

    /*설명서 1개를 상세 조회한다.*/
    public UseinfoDTO selectUseInfo(int useinfoCode) {

        log.info("[AdminUseInfoService] selectUseInfo start");

        Useinfo useinfo = adminUseInfoRepository.findById(useinfoCode).orElse(null);

        log.info("[AdminUseInfoService] selectUseInfo end");

        return modelMapper.map(useinfo, UseinfoDTO.class);
    }
    /*설명서 1개를 등록한다.*/
    @Transactional
    public Object insertUseInfo(UseinfoDTO useinfoDTO, MultipartFile useinfoImage) {

        log.info("[AdminUseInfoService] insertUseInfo start");

        String imageName = UUID.randomUUID().toString().replace("-", "");
        String replaceFileName = null;
        int result = 0;

        try {

            if (useinfoImage == null) {
                useinfoDTO.setUseinfoImg("");

            } else {

                replaceFileName = FileUploadUtils.saveFile(IMAGE_DIR, imageName, useinfoImage);
                useinfoDTO.setUseinfoImg(replaceFileName);

            }

            Useinfo newUseinfo = modelMapper.map(useinfoDTO, Useinfo.class);

            adminUseInfoRepository.save(newUseinfo);

            result = 1;

            log.info("[AdminUseInfoService] insertUseInfo end");

        } catch (Exception e) {
            FileUploadUtils.deleteFile(IMAGE_DIR, replaceFileName);
            throw new RuntimeException(e);
        }

        return (result > 0) ? "공지 등록 성공" : "공지 등록 실패";
    }


    /*설명서 1개를 수정한다.*/
    @Transactional
    public Object updateUseInfo(int useinfoCode, UseinfoDTO useinfoDTO) {

        log.info("[AdminUseInfoService] updateUseInfo start");

        Useinfo updateUseinfo = adminUseInfoRepository.findById(useinfoCode).orElse(null);
        updateUseinfo.setUseinfoContents(useinfoDTO.getUseinfoContents());
        adminUseInfoRepository.save(updateUseinfo);

        log.info("[AdminUseInfoService] updateUseInfo end");

        return modelMapper.map(updateUseinfo, UseinfoDTO.class);
    }
    /*설명서 1개를 삭제한다.*/
    @Transactional
    public Object deleteUseInfo(int useinfoCode) {

        log.info("[AdminUseInfoService] deleteUseInfo start");

        int result = 0;
        Useinfo useinfo = adminUseInfoRepository.findById(useinfoCode).orElse(null);

        if (useinfo != null) {
            adminUseInfoRepository.delete(useinfo);
            result = 1;
        }

        log.info("[AdminUseInfoService] deleteUseInfo end");

        return (result > 0) ? "삭제 성공" : "삭제 실패";
    }

    public Object appendUseinfoCount(int useinfoCode, UseinfoDTO useinfoDTO) {

        log.info("[AdminUseInfoService] appendUseinfoCount() start");

        Useinfo updateUseinfo = adminUseInfoRepository.findById(useinfoCode).orElse(null);
        updateUseinfo.setUseinfoCount(updateUseinfo.getUseinfoCount() + 1);
        adminUseInfoRepository.save(updateUseinfo);

        log.info("[AdminUseInfoService] appendUseinfoCount() end");

        return modelMapper.map(updateUseinfo, UseinfoDTO.class);
    }
}
