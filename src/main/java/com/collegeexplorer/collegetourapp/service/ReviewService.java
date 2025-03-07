package com.collegeexplorer.collegetourapp.service;


import com.collegeexplorer.collegetourapp.exception.ResourceNotFoundException;
import com.collegeexplorer.collegetourapp.exception.UnauthorizedException;
import com.collegeexplorer.collegetourapp.model.Facility;
import com.collegeexplorer.collegetourapp.model.Review;
import com.collegeexplorer.collegetourapp.model.User;
import com.collegeexplorer.collegetourapp.payload.ReviewRequest;
import com.collegeexplorer.collegetourapp.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final AuthService authService;
    private final FacilityService facilityService;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review", "id", id));
    }

    public List<Review> getReviewsByFacility(Long facilityId) {
        Facility facility = facilityService.getFacilityById(facilityId);
        return reviewRepository.findByFacilityOrderByCreatedAtDesc(facility);
    }

    public List<Review> getReviewsByUser(Long userId) {
        User user = authService.getUserById(userId);
        return reviewRepository.findByUser(user);
    }

    public Review createReview(Long facilityId, ReviewRequest reviewRequest, Long userId) {
        User user = authService.getUserById(userId);
        Facility facility = facilityService.getFacilityById(facilityId);
        
        Review review = new Review();
        review.setUser(user);
        review.setFacility(facility);
        review.setCreatedAt(LocalDateTime.now());
        updateReviewFromRequest(review, reviewRequest);
        
        return reviewRepository.save(review);
    }

    public Review updateReview(Long id, ReviewRequest reviewRequest, Long currentUserId) {
        Review review = getReviewById(id);
        
        // Check if the current user is the author of the review
        if (!review.getUser().getId().equals(currentUserId)) {
            throw new UnauthorizedException("You are not authorized to update this review");
        }
        
        updateReviewFromRequest(review, reviewRequest);
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id, Long currentUserId) {
        Review review = getReviewById(id);
        
        // Check if the current user is the author of the review or an admin
        if (!review.getUser().getId().equals(currentUserId) && 
            !authService.getUserById(currentUserId).getRole().equals(User.UserRole.ADMIN)) {
            throw new UnauthorizedException("You are not authorized to delete this review");
        }
        
        reviewRepository.delete(review);
    }

    private void updateReviewFromRequest(Review review, ReviewRequest request) {
        review.setRating(request.getRating());
        review.setComment(request.getComment());
    }
}