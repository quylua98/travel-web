import axios from 'axios';
import { API_URL } from 'src/constants';

const axiosClient = axios.create({
  baseURL: `${API_URL}/api`,
  responseType: 'json',
});

export default axiosClient;
