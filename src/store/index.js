import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import Reports from './reports/reports';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    reports: Reports,
  },
  plugins: [
    createPersistedState({
      paths: ['reports.savedReports'],
    }),
  ],
});
