package com.collegeexplorer.collegetourapp.controller;



import com.collegeexplorer.collegetourapp.model.Review;
import com.collegeexplorer.collegetourapp.payload.ApiResponse;
import com.collegeexplorer.collegetourapp.payload.ReviewRequest;
import com.collegeexplorer.collegetourapp.security.UserPrincipal;
import com.collegeexplorer.collegetourapp.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getReviewById(id));
    }

    @GetMapping("/facility/{facilityId}")
    public ResponseEntity<List<Review>> getReviewsByFacility(@PathVariable Long facilityId) {
        return ResponseEntity.ok(reviewService.getReviewsByFacility(facilityId));
    }

    @GetMapping("/my-reviews")
    public ResponseEntity<List<Review>> getMyReviews(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(reviewService.getReviewsByUser(currentUser.getId()));
    }

    @PostMapping("/facility/{facilityId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Review> createReview(@PathVariable Long facilityId,
                                            @RequestBody ReviewRequest reviewRequest,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.createReview(facilityId, reviewRequest, currentUser.getId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Review> updateReview(@PathVariable Long id,
                                            @RequestBody ReviewRequest reviewRequest,
                                            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(reviewService.updateReview(id, reviewRequest, currentUser.getId()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse> deleteReview(@PathVariable Long id,
                                                  @AuthenticationPrincipal UserPrincipal currentUser) {
        reviewService.deleteReview(id, currentUser.getId());
        return ResponseEntity.ok(new ApiResponse(true, "Review deleted successfully"));
    }
}