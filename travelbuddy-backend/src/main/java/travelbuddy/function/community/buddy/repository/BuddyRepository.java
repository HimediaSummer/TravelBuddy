package travelbuddy.function.community.buddy.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.buddy.entity.Buddy;

import java.util.List;

public interface BuddyRepository extends JpaRepository<Buddy, Integer> {


    List<Buddy> findByBuddyStatus(String status);

    Page<Buddy> findByBuddyStatus(String status, Pageable paging);

//    List<Buddy> findByMemberCode();
}
