
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/map/';

class MapService {
  getMapData() {
    return axios.get(API_URL + 'data');
  }

  getLocationById(id) {
    return axios.get(API_URL + 'locations/' + id);
  }
}

export default new MapService();