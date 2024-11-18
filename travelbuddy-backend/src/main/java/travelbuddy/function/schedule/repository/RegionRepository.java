package travelbuddy.function.schedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.schedule.entity.Region;

public interface RegionRepository extends JpaRepository<Region, Integer> {
}
