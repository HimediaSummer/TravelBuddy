package travelbuddy.function.community.buddy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import travelbuddy.function.community.buddy.entity.BuddyType;

public interface BuddyTypeRepository extends JpaRepository<BuddyType, Integer> {
}
