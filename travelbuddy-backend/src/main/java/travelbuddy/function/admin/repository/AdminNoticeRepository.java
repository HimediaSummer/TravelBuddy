package travelbuddy.function.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.notice.entity.Notice;

import java.util.List;

public interface AdminNoticeRepository extends JpaRepository<Notice, Integer> {
    List<Notice> findByNoticeTitleContaining(String search);
}
