import OrderService from '../_services/order.service';
import router from "../router";
import Swal from 'sweetalert2'

export const order = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            OrderService.getAll()
                .then(
                    order => {
                        commit('getAllSuccess', order.data);
                    }
                )
                .catch(
                    error => {
                        commit('getAllFailure', error)
                    }
                )
        },

        getById({ commit }, id) {
            commit('getAllRequest');

            OrderService.getByid(id)
                .then(
                    order => {
                        commit('getAllSuccess', order.data);
                    }
                )
                .catch(
                    error => {
                        commit('getAllFailure', error)
                    }
                )
        },

        createOrder({ commit }, data) {
            commit('getAllRequest');

            OrderService.create(data)
                .then(
                    order => {
                        Swal.fire({
                            icon : 'success',
                            title: 'Success',
                            text : 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        commit('getAllSuccess', order.data);
                        router.push({name:'order'})
                    }
                )
                .catch(
                    error => {
                        commit('getAllFailure', error)
                    }
                )
        },

        updateOrder({ commit }, data) {
            commit('getAllRequest');
            OrderService.update(data.id, data.data)
                .then(
                    order => {
                        Swal.fire({
                            icon : 'success',
                            title: 'Success',
                            text : 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        commit('getAllSuccess', order.data);
                        router.push({name:'order'})
                    }
                )
                .catch(
                    error => {
                        commit('getAllFailure', error)
                    }
                )
        }
    },
    mutations: {
        getAllRequest(state) {
            state.all = { loading: true };
        },
        getAllSuccess(state, order) {
            state.all = { items: order };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}
