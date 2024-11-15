package travelbuddy.function.schedule.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.repository.ScheduleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    private static final Logger log = LoggerFactory.getLogger(ScheduleService.class);
    private final ScheduleRepository scheduleRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ScheduleService(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public int selectProductTotal() {
        log.info("[ProductService] selectProductTotal() Start");

        /* 설명. 페이징 처리 결과를 Page 타입으로 반환받음 */
        List<Schedule> productList = ScheduleRepository.findBySchedule("Y");

        log.info("[ProductService] selectProductTotal() End");

        return productList.size();
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAllSchedules();
    }

    public Object selectSearchRegionList(int RegionCode) {
        log.info("[ProductService] selectProduct() Start");

        Region region = ScheduleRepository.findById(RegionCode).get();
//        region.setProductImageUrl(IMAGE_URL + region.getProductImageUrl());

        log.info("[ProductService] selectProduct() End");

        return modelMapper.map(product, Product.class);
    }
} 