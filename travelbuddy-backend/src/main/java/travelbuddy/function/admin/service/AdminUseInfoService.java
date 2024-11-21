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
import travelbuddy.function.admin.repository.AdminUseInfoRepository;
import travelbuddy.function.community.useinfo.dto.UseinfoDTO;
import travelbuddy.function.community.useinfo.entity.Useinfo;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminUseInfoService {

    private static final Logger log = LoggerFactory.getLogger(AdminUseInfoService.class);
    private final AdminUseInfoRepository adminUseInfoRepository;
    private final ModelMapper modelMapper;

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
    public Object insertUseInfo(UseinfoDTO useinfoDTO) {

        log.info("[AdminUseInfoService] insertUseInfo start");

        Useinfo newUseinfo = modelMapper.map(useinfoDTO , Useinfo.class);
        adminUseInfoRepository.save(newUseinfo);

        log.info("[AdminUseInfoService] insertUseInfo end");

        return modelMapper.map(newUseinfo, UseinfoDTO.class);
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
}
