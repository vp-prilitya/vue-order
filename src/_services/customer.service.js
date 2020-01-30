import axios from 'axios';

class CustomerService {
    getAll() {
        return axios.get(process.env.VUE_APP_URL + '/customer');
    }
}

export default new CustomerService();