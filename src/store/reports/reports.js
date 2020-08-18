import reportsApi from '@/api/reports-api';
import ReportModel from '@/models/reportModel';

function filterListByTag(list, filterByTagValue) {
  if (!filterByTagValue) return list;
  return list.filter((listItem) => listItem.tags.indexOf(filterByTagValue) >= 0);
}
function filterListByPage(list, { page = 1, maxItemsByPage }) {
  const minListPageIndex = maxItemsByPage * (page - 1);
  const maxListPageIndex = minListPageIndex + maxItemsByPage;
  return list.filter((listItem, index) => index >= minListPageIndex && index < maxListPageIndex);
}

export default {
  namespaced: true,
  state: {
    reports: null,
    savedReports: [],
    filteredReports: null,
    filterTagOptions: null,
    pagesCount: null,
  },
  getters: {
    reports: (state) => state.reports,
    filterTagOptions: (state) => state.filterTagOptions,
    filteredReports: (state) => state.filteredReports,
    pagesCount: (state) => state.pagesCount,
  },
  mutations: {
    SET_REPORTS(state, data) {
      state.reports = data;
    },
    SET_FILTERED_REPORTS(state, data) {
      state.filteredReports = data;
    },
    SET_FILTER_TAG_OPTIONS(state, data) {
      state.filterTagOptions = data;
    },
    SET_PAGES_COUNT(state, list) {
      const maxItemsPerPage = 5;
      const pagesCount = list ? Math.ceil(list.length / maxItemsPerPage) : null;
      state.pagesCount = pagesCount;
    },
    SAVE_REPORT(state, report) {
      state.savedReports.push(report);
    },
    REMOVE_REPORT(state, report) {
      state.savedReports.splice(report.index, 1);
    },
  },
  actions: {
    async getReports({ commit }, query = {}) {
      const { data } = await reportsApi.getReports();
      const list = data.map((report) => new ReportModel(report));
      const filteredListByTag = filterListByTag(list, query.tag);
      const filteredListByPagination = filterListByPage(filteredListByTag, {
        page: query.page,
        maxItemsByPage: 5,
      });
      commit('SET_REPORTS', list);
      commit('SET_PAGES_COUNT', filteredListByTag);
      commit('SET_FILTERED_REPORTS', filteredListByPagination);
      return list;
    },
    getSavedReports({ state, commit }, query = {}) {
      const data = state.savedReports;
      const list = data.map((report, index) => new ReportModel({
        ...report,
        index,
        isSaved: true,
      }));
      const filteredListByTag = filterListByTag(list, query.tag);
      const filteredListByPagination = filterListByPage(filteredListByTag, {
        page: query.page,
        maxItemsByPage: 5,
      });
      commit('SET_REPORTS', list);
      commit('SET_PAGES_COUNT', filteredListByTag);
      commit('SET_FILTERED_REPORTS', filteredListByPagination);
      return list;
    },
    setTagFilterOptions({ state, commit }) {
      if (state.reports) {
        const filterOptions = new Set();
        state.reports.forEach((report) => {
          report.tags.forEach((tag) => {
            filterOptions.add(tag);
          });
        });
        commit('SET_FILTER_TAG_OPTIONS', filterOptions);
        return filterOptions;
      }
      return [];
    },
  },
};
