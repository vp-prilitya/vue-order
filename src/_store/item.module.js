import ItemService from '../_services/item.service';

export const item = {
    namespaced: true,
    state: {
        all: {}
    },
    actions: {
        getAll({ commit }) {
            commit('getAllRequest');

            ItemService.getAll()
                .then(
                    item => {
                        commit('getAllSuccess', item.data);
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
        getAllSuccess(state, item) {
            state.all = { items: item };
        },
        getAllFailure(state, error) {
            state.all = { error };
        }
    }
}
