package travelbuddy.function.community.buddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.buddy.entity.BuddyMatchData;

public interface BuddyMatchRepository extends JpaRepository<BuddyMatchData, Integer> {

}
