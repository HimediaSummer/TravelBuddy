package travelbuddy.function.community.useinfo.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import travelbuddy.common.Criteria;
import travelbuddy.function.community.useinfo.dto.UseinfoDTO;
import travelbuddy.function.community.useinfo.entity.Useinfo;
import travelbuddy.function.community.useinfo.repository.UseInfoRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UseInfoService {

    private static final Logger log = LoggerFactory.getLogger(UseInfoService.class);
    private final UseInfoRepository useInfoRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public UseInfoService(ModelMapper modelMapper, UseInfoRepository useInfoRepository) {
        this.modelMapper = modelMapper;
        this.useInfoRepository = useInfoRepository;
    }

    /* 설명서 리스트의 총 합을 구한다.*/
    public int selectUseInfoTotal() {

        log.info("[UseInfoService] selectUseInfoTotal start");

        List<Useinfo> useInfoList = useInfoRepository.findAll();

        log.info("[UseInfoService] selectUseInfoTotal end");

        return useInfoList.size();

    }
    /*설명서 리스트와 paging 처리를 함께 한다.*/
    public Object selectUseInfoListWithPaging(Criteria cri) {

        log.info("[UseInfoService] selectUseInfoListWithPaging start");

        int index = cri.getPageNum() - 1;
        int count = cri.getAmount();
        Pageable paging = PageRequest.of(index, count, Sort.by("useinfoCode").descending());

        Page<Useinfo> result = useInfoRepository.findAll(paging);
        List<Useinfo> useInfoList = (List<Useinfo>)result.getContent();

        log.info("[UseInfoService] selectUseInfoListWithPaging end");

        return useInfoList.stream().map((element) -> modelMapper.map(element, UseinfoDTO.class)).collect(Collectors.toList());
    }

    /*설명서 1개를 상세 조회한다.*/
    public UseinfoDTO selectUseInfo(int useinfoCode) {

        log.info("[UseInfoService] selectUseInfo start");

        Useinfo useinfo = useInfoRepository.findById(useinfoCode).orElse(null);

        log.info("[UseInfoService] selectUseInfo end");

        return modelMapper.map(useinfo, UseinfoDTO.class);
    }
}
