
import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/reviews/';

class ReviewService {
  getAllReviews() {
    return axios.get(API_URL);
  }

  getReviewById(id) {
    return axios.get(API_URL + id);
  }

  createReview(review) {
    return axios.post(API_URL, review, { headers: authHeader() });
  }

  updateReview(id, review) {
    return axios.put(API_URL + id, review, { headers: authHeader() });
  }

  deleteReview(id) {
    return axios.delete(API_URL + id, { headers: authHeader() });
  }
}

export default new ReviewService();