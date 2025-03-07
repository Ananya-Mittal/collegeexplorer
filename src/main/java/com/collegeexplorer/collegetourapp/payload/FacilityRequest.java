package com.collegeexplorer.collegetourapp.payload;



import com.collegeexplorer.collegetourapp.model.Facility;

import lombok.Data;

@Data
public class FacilityRequest {
    private String name;
    private String description;
    private String buildingName;
    private String location;
    private String imageUrl;
    private double latitude;
    private double longitude;
    private Facility.FacilityType type;
    private String openingHours;
}