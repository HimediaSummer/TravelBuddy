package travelbuddy.function.community.buddy.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelbuddy.function.community.buddy.entity.Buddy;

import java.util.List;

public interface BuddyRepository extends JpaRepository<Buddy, Integer> {


    List<Buddy> findByBuddyStatus(String status);

    Page<Buddy> findByBuddyStatus(String status, Pageable paging);

    @Query(value = "ALTER TABLE tbl_buddy AUTO_INCREMENT = ?1", nativeQuery = true)
    @Modifying
    void resetAutoIncrement(int value);

    @Query(value = "SELECT MAX(buddy_code) FROM tbl_buddy", nativeQuery = true)
    Integer findMaxBuddyCode();

    @Modifying
    @Query(value = "UPDATE tbl_buddy SET buddy_code = buddy_code - 1 WHERE buddy_code > :deletedBuddyCode", nativeQuery = true)
    void updateBuddyCodesAfterDelete(@Param("deletedBuddyCode") int deletedBuddyCode);

    List<Buddy> buddyTitleContaining(String search);

//    List<Buddy> findByProductNameContaining(String search);

//    List<Buddy> findByMemberCode();
}
