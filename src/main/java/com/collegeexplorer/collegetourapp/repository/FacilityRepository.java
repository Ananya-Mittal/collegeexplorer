package com.collegeexplorer.collegetourapp.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.collegeexplorer.collegetourapp.model.Facility;

public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findByType(Facility.FacilityType type);
    List<Facility> findByNameContainingIgnoreCase(String name);
    List<Facility> findByBuildingName(String buildingName);
}