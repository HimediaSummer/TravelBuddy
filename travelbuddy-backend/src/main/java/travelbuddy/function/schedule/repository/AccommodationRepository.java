package travelbuddy.function.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.schedule.entity.Accommodation;

public interface AccommodationRepository extends JpaRepository<Accommodation, Integer> {

    // 숙소코드로 숙소 조회
    Accommodation findByAccomCode(int accomCode);
}
