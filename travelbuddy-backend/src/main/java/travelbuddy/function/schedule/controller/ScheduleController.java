package travelbuddy.function.schedule.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import travelbuddy.common.PageDTO;
import travelbuddy.common.PagingResponseDTO;
import travelbuddy.function.schedule.dto.RegionDTO;
import travelbuddy.function.schedule.dto.ScheduleDTO;
import travelbuddy.function.schedule.entity.Region;
import travelbuddy.function.schedule.entity.Schedule;
import travelbuddy.function.schedule.service.ScheduleService;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public List<Schedule> getAllSchedules() {

        return scheduleService.getAllSchedules();
    }

    @GetMapping("/products/region")
    public Region<RegionDTO> getAllRegion() {


        return Region.ok().body(new RegionDTO(HttpStatus.OK, "조회 성공",  scheduleService.selectSearchRegionList(search)));
    }
}
