package travelbuddy.function.member.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import travelbuddy.function.community.buddy.entity.Buddy;
import travelbuddy.function.member.entity.Account;

import java.util.List;
import java.util.Optional;

public interface MyBuddyRepository extends JpaRepository<Buddy, Integer> {

    @Query("SELECT b, r.regionName, t.buddyTypeName, a.memberName " +
            "FROM Buddy b " +
            "JOIN b.region r " +
            "JOIN b.buddyType t " +
            "JOIN b.account a " +
            "WHERE a.memberCode = :memberCode")
    List<Object[]> findAllByAccount(int memberCode);

    @Query("SELECT b FROM Buddy b " +
            "JOIN FETCH b.region " +
            "JOIN FETCH b.account " +
            "JOIN FETCH b.buddyType " +
            "WHERE b.buddyCode = :buddyCode")
    Buddy findByBuddyCode(@Param("buddyCode") int buddyCode);

    @Modifying
    @Query("DELETE FROM Buddy b WHERE b.buddyCode IN :buddyCodes")
    void deleteByBuddyCode(@Param("buddyCodes") List<Integer> buddyCodes);

    @Query("SELECT b FROM Buddy b WHERE b.buddyCode IN :buddyCodes")
    List<Buddy> findByBuddyCodeIn(@Param("buddyCodes") List<Integer> buddyCodes);

    @Query("SELECT b, r.regionName, t.buddyTypeName, a.memberName " +
            "FROM Buddy b " +
            "JOIN b.region r " +
            "JOIN b.buddyType t " +
            "JOIN b.account a " +
            "WHERE a.memberCode = :memberCode")
    Page<Object[]> findAllBuddyListPaging(@Param("memberCode") int memberCode, Pageable pageable);

    @Query("SELECT COUNT(b) FROM Buddy b WHERE b.account.memberCode = :memberCode")
    int countByMemberCode(@Param("memberCode") int memberCode);

    // Auto Increment 게시글 삭제 후 buddyCode 나열하기
//    @Query(value = "ALTER TABLE tbl_buddy AUTO_INCREMENT = ?1", nativeQuery = true)
//    @Modifying
//    void resetAutoIncrement(int value);
//
//    @Query(value = "SELECT MAX(buddy_code) FROM tbl_buddy", nativeQuery = true)
//    Integer findMaxBuddyCode();
//
//    @Modifying
//    @Query(value = "UPDATE tbl_buddy SET buddy_code = buddy_code - 1 WHERE buddy_code > :deletedBuddyCode", nativeQuery = true)
//    void updateBuddyCodesAfterDelete(@Param("deletedBuddyCode") int deletedBuddyCode);
}
