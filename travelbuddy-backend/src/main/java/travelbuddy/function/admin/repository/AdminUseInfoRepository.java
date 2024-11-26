package travelbuddy.function.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.useinfo.entity.Useinfo;

import java.util.List;

public interface AdminUseInfoRepository extends JpaRepository<Useinfo,Integer> {

    List<Useinfo> findByUseinfoTitleContaining(String search);
}
