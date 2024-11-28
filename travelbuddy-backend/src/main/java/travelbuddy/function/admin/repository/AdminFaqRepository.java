package travelbuddy.function.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.qnafaq.entity.Faq;

import java.util.List;

public interface AdminFaqRepository extends JpaRepository<Faq,Integer> {
    List<Faq> findByFaqTitleContaining(String search);
}
