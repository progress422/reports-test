import axios from 'axios';

const getReports = () => axios.get('https://my-json-server.typicode.com/kotanskiy/rest_simple/reports');

export default {
  getReports,
};
