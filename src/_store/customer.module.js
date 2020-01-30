import CustomerService from '../_services/customer.service';

export const customer = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            CustomerService.getAll()
                .then(
                    customer => {
                        commit('getAllSuccess', customer.data);
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
        getAllSuccess(state, customer) {
            state.all = { items: customer };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}
