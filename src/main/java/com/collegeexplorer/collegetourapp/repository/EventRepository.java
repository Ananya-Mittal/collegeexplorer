package com.collegeexplorer.collegetourapp.repository;



import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.collegeexplorer.collegetourapp.model.Event;
import com.collegeexplorer.collegetourapp.model.User;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByType(Event.EventType type);
    List<Event> findByIsPublic(boolean isPublic);
    List<Event> findByOrganizer(User organizer);
    List<Event> findByStartTimeBetween(LocalDateTime start, LocalDateTime end);
    List<Event> findByTitleContainingIgnoreCase(String title);
}