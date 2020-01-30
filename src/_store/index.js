import Vue from 'vue';
import Vuex from 'vuex';

import { order } from './order.module';
import { customer } from './customer.module';
import { item } from './item.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
       order,
       customer,
       item
    }
});