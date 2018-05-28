import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import * as actions from "./actions";
import * as mutations from "./mutations";

const store = new Vuex.Store({
  strict: true,
  actions,
  mutations,
  state: {
    todos: []
  }
});

export default store;
