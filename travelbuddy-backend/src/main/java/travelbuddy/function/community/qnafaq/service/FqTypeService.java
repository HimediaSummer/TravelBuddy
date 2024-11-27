package travelbuddy.function.community.qnafaq.service;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import travelbuddy.function.community.qnafaq.dto.FqTypeDTO;
import travelbuddy.function.community.qnafaq.entity.FqType;
import travelbuddy.function.community.qnafaq.repository.FqTypeRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FqTypeService {

    private static final Logger log = LoggerFactory.getLogger(FqTypeService.class);
    private final FqTypeRepository fqTypeRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public FqTypeService(FqTypeRepository fqTypeRepository, ModelMapper modelMapper) {
        this.fqTypeRepository = fqTypeRepository;
        this.modelMapper = modelMapper;
    }

    /* 코드에 맞는 이름을 가지고 반환한다. */
    public Object getFqTypeName() {
        List<FqType> getFqTypeNameList = fqTypeRepository.findAll();
        return getFqTypeNameList.stream().map((element) -> modelMapper.map(element, FqTypeDTO.class)).collect(Collectors.toList());

    }
}
