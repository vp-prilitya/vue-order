import axios from 'axios';

class ItemService {
    getAll() {
        return axios.get(process.env.VUE_APP_URL + '/item');
    }
}

export default new ItemService();