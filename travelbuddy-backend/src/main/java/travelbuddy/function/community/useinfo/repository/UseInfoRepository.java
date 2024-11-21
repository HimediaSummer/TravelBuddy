package travelbuddy.function.community.useinfo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.useinfo.entity.Useinfo;

public interface UseInfoRepository extends JpaRepository<Useinfo,Integer> {
}
