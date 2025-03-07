
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/facilities/';

class FacilityService {
  getAllFacilities() {
    return axios.get(API_URL);
  }

  getFacilityById(id) {
    return axios.get(API_URL + id);
  }

  createFacility(facility) {
    return axios.post(API_URL, facility, { headers: authHeader() });
  }

  updateFacility(id, facility) {
    return axios.put(API_URL + id, facility, { headers: authHeader() });
  }

  deleteFacility(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new FacilityService();