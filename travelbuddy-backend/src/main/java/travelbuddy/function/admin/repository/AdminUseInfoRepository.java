package travelbuddy.function.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.useinfo.entity.Useinfo;

public interface AdminUseInfoRepository extends JpaRepository<Useinfo,Integer> {

}
