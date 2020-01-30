import axios from 'axios';

class OrderService {
    getAll() {
        return axios.get(process.env.VUE_APP_URL + '/listorder');
    }

    getByid(id){
        return axios.get(process.env.VUE_APP_URL + '/getorder/' + id); 
    }

    create(data){
        return axios.post(process.env.VUE_APP_URL + '/saveorder', data);
    }

    update(id, data){
        return axios.put(process.env.VUE_APP_URL + '/saveorder/' + id, data);
    }

    delete(code){
        return axios.delete(process.env.VUE_APP_URL + '/deleteorder/' + code)
    }
}

export default new OrderService();