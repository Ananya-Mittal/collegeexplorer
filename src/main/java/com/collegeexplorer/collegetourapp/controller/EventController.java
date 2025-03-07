package com.collegeexplorer.collegetourapp.controller;



import com.collegeexplorer.collegetourapp.model.Event;
import com.collegeexplorer.collegetourapp.payload.ApiResponse;
import com.collegeexplorer.collegetourapp.payload.EventRequest;
import com.collegeexplorer.collegetourapp.security.UserPrincipal;
import com.collegeexplorer.collegetourapp.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<Event>> getEventsByType(@PathVariable Event.EventType type) {
        return ResponseEntity.ok(eventService.getEventsByType(type));
    }

    @GetMapping("/public")
    public ResponseEntity<List<Event>> getPublicEvents() {
        return ResponseEntity.ok(eventService.getPublicEvents());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(@RequestParam String query) {
        return ResponseEntity.ok(eventService.searchEvents(query));
    }

    @GetMapping("/between")
    public ResponseEntity<List<Event>> getEventsBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {
        return ResponseEntity.ok(eventService.getEventsBetween(start, end));
    }

    @GetMapping("/my-events")
    public ResponseEntity<List<Event>> getMyEvents(@AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(eventService.getEventsByOrganizer(currentUser.getId()));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    public ResponseEntity<Event> createEvent(@RequestBody EventRequest eventRequest,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(eventService.createEvent(eventRequest, currentUser.getId()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id,
                                           @RequestBody EventRequest eventRequest,
                                           @AuthenticationPrincipal UserPrincipal currentUser) {
        return ResponseEntity.ok(eventService.updateEvent(id, eventRequest, currentUser.getId()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'FACULTY')")
    public ResponseEntity<ApiResponse> deleteEvent(@PathVariable Long id,
                                                 @AuthenticationPrincipal UserPrincipal currentUser) {
        eventService.deleteEvent(id, currentUser.getId());
        return ResponseEntity.ok(new ApiResponse(true, "Event deleted successfully"));
    }
}