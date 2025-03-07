
import api from './axios';

class EventService {
  getAllEvents() {
    return api.get('/events');
  }
  
  getEventById(id) {
    return api.get(`/events/${id}`);
  }
  
  createEvent(eventData) {
    return api.post('/events', eventData);
  }
  
  updateEvent(id, eventData) {
    return api.put(`/events/${id}, eventData`);
  }
  
  deleteEvent(id) {
    return api.delete(`/events/${id}`);
  }
}

export default new EventService();