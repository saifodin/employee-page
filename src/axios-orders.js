import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://web-services-cb472-default-rtdb.firebaseio.com/'
})

export default instance;