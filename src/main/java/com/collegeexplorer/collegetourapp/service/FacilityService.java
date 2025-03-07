package com.collegeexplorer.collegetourapp.service;



import com.collegeexplorer.collegetourapp.exception.ResourceNotFoundException;
import com.collegeexplorer.collegetourapp.model.Facility;
import com.collegeexplorer.collegetourapp.payload.FacilityRequest;
import com.collegeexplorer.collegetourapp.repository.FacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    public Facility getFacilityById(Long id) {
        return facilityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Facility", "id", id));
    }

    public List<Facility> getFacilitiesByType(Facility.FacilityType type) {
        return facilityRepository.findByType(type);
    }

    public List<Facility> searchFacilities(String query) {
        return facilityRepository.findByNameContainingIgnoreCase(query);
    }

    public Facility createFacility(FacilityRequest facilityRequest) {
        Facility facility = new Facility();
        updateFacilityFromRequest(facility, facilityRequest);
        return facilityRepository.save(facility);
    }

    public Facility updateFacility(Long id, FacilityRequest facilityRequest) {
        Facility facility = getFacilityById(id);
        updateFacilityFromRequest(facility, facilityRequest);
        return facilityRepository.save(facility);
    }

    public void deleteFacility(Long id) {
        Facility facility = getFacilityById(id);
        facilityRepository.delete(facility);
    }

    private void updateFacilityFromRequest(Facility facility, FacilityRequest request) {
        facility.setName(request.getName());
        facility.setDescription(request.getDescription());
        facility.setBuildingName(request.getBuildingName());
        facility.setLocation(request.getLocation());
        facility.setLatitude(request.getLatitude());
        facility.setLongitude(request.getLongitude());
        facility.setType(request.getType());
        facility.setOpeningHours(request.getOpeningHours());
        facility.setImageUrl(request.getImageUrl());
    }
}