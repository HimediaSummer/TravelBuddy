package travelbuddy.function.community.notice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.notice.entity.Notice;

public interface NoticeRepository extends JpaRepository<Notice,Integer> {

}
