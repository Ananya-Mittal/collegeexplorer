package com.collegeexplorer.collegetourapp.repository;



import com.collegeexplorer.collegetourapp.model.Facility;
import com.collegeexplorer.collegetourapp.model.Review;
import com.collegeexplorer.collegetourapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByUser(User user);
    List<Review> findByFacility(Facility facility);
    List<Review> findByFacilityOrderByCreatedAtDesc(Facility facility);
    List<Review> findByRatingGreaterThanEqual(int rating);
}