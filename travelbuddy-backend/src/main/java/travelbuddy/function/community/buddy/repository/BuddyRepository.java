package travelbuddy.function.community.buddy.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import travelbuddy.function.community.buddy.entity.Buddy;

import java.util.List;

public interface BuddyRepository extends JpaRepository<Buddy, Integer> {


    List<Buddy> findByBuddyStatus(String status);

    Page<Buddy> findByBuddyStatus(String status, Pageable paging);

    @Query("SELECT b, r.regionName, t.buddyTypeName, a.memberName " +
            "FROM Buddy b " +
            "JOIN b.region r " +
            "JOIN b.buddyType t " +
            "JOIN b.account a " +
            "WHERE a.memberCode = :memberCode")
    Page<Object[]> findAllBuddyListPaging(Pageable paging);

//    List<Buddy> findByMemberCode();
}
