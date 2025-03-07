package com.collegeexplorer.collegetourapp.controller;



import com.collegeexplorer.collegetourapp.model.Facility;
import com.collegeexplorer.collegetourapp.payload.ApiResponse;
import com.collegeexplorer.collegetourapp.payload.FacilityRequest;
import com.collegeexplorer.collegetourapp.service.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@RequiredArgsConstructor
public class FacilityController {

    private final FacilityService facilityService;

    @GetMapping
    public ResponseEntity<List<Facility>> getAllFacilities() {
        return ResponseEntity.ok(facilityService.getAllFacilities());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable Long id) {
        return ResponseEntity.ok(facilityService.getFacilityById(id));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Facility>> getFacilitiesByType(@PathVariable Facility.FacilityType type) {
        return ResponseEntity.ok(facilityService.getFacilitiesByType(type));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Facility>> searchFacilities(@RequestParam String query) {
        return ResponseEntity.ok(facilityService.searchFacilities(query));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Facility> createFacility(@RequestBody FacilityRequest facilityRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(facilityService.createFacility(facilityRequest));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Facility> updateFacility(@PathVariable Long id, @RequestBody FacilityRequest facilityRequest) {
        return ResponseEntity.ok(facilityService.updateFacility(id, facilityRequest));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteFacility(@PathVariable Long id) {
        facilityService.deleteFacility(id);
        return ResponseEntity.ok(new ApiResponse(true, "Facility deleted successfully"));
    }
}