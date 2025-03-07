package com.collegeexplorer.collegetourapp.model;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "facilities")
public class Facility {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private String buildingName;
    
    @Column(nullable = false)
    private String location;
    
    private String imageUrl;
    
    @Column(nullable = false)
    private double latitude;
    
    @Column(nullable = false)
    private double longitude;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FacilityType type;
    
    private String openingHours;
    
    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL)
    private Set<Review> reviews = new HashSet<>();
    
    public enum FacilityType {
        ACADEMIC_BUILDING, LIBRARY, LAB, CAFETERIA, DORMITORY, SPORTS, ADMINISTRATIVE, OTHER
    }
}