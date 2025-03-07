package com.collegeexplorer.collegetourapp.payload;



import java.time.LocalDateTime;

import com.collegeexplorer.collegetourapp.model.Event;

import lombok.Data;

@Data
public class EventRequest {
    private String title;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String location;
    private String imageUrl;
    private Event.EventType type;
    private boolean isPublic;
}