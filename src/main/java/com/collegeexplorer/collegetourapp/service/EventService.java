package com.collegeexplorer.collegetourapp.service;




import com.collegeexplorer.collegetourapp.exception.ResourceNotFoundException;
import com.collegeexplorer.collegetourapp.exception.UnauthorizedException;
import com.collegeexplorer.collegetourapp.model.Event;
import com.collegeexplorer.collegetourapp.model.User;
import com.collegeexplorer.collegetourapp.payload.EventRequest;
import com.collegeexplorer.collegetourapp.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final AuthService authService;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
    }

    public List<Event> getEventsByType(Event.EventType type) {
        return eventRepository.findByType(type);
    }

    public List<Event> getPublicEvents() {
        return eventRepository.findByIsPublic(true);
    }

    public List<Event> searchEvents(String query) {
        return eventRepository.findByTitleContainingIgnoreCase(query);
    }

    public List<Event> getEventsBetween(LocalDateTime start, LocalDateTime end) {
        return eventRepository.findByStartTimeBetween(start, end);
    }

    public List<Event> getEventsByOrganizer(Long organizerId) {
        User organizer = authService.getUserById(organizerId);
        return eventRepository.findByOrganizer(organizer);
    }

    public Event createEvent(EventRequest eventRequest, Long organizerId) {
        User organizer = authService.getUserById(organizerId);
        
        Event event = new Event();
        event.setOrganizer(organizer);
        updateEventFromRequest(event, eventRequest);
        
        return eventRepository.save(event);
    }

    public Event updateEvent(Long id, EventRequest eventRequest, Long currentUserId) {
        Event event = getEventById(id);
        
        // Check if the current user is the organizer or an admin
        if (!event.getOrganizer().getId().equals(currentUserId) && 
            !authService.getUserById(currentUserId).getRole().equals(User.UserRole.ADMIN)) {
            throw new UnauthorizedException("You are not authorized to update this event");
        }
        
        updateEventFromRequest(event, eventRequest);
        return eventRepository.save(event);
    }

    public void deleteEvent(Long id, Long currentUserId) {
        Event event = getEventById(id);
        
        // Check if the current user is the organizer or an admin
        if (!event.getOrganizer().getId().equals(currentUserId) && 
            !authService.getUserById(currentUserId).getRole().equals(User.UserRole.ADMIN)) {
            throw new UnauthorizedException("You are not authorized to delete this event");
        }
        
        eventRepository.delete(event);
    }

    private void updateEventFromRequest(Event event, EventRequest request) {
        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setStartTime(request.getStartTime());
        event.setEndTime(request.getEndTime());
        event.setLocation(request.getLocation());
        event.setType(request.getType());
        event.setPublic(request.isPublic());
        event.setImageUrl(request.getImageUrl());
    }
}