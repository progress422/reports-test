<template lang="pug">
  .reports
    .container
      report-filters(
        @filterChange="loadReports"
      )
      report-block(
        v-for="(report, index) in reports"
        :key="index"
        :model="report"
        @reportRemoved="loadReports"
      )
      reports-pagination(
        v-if="pagesCount > 1"
        :pages="pagesCount"
        @paginationChange="loadReports"
      )
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  components: {
    reportBlock: () => import('@/components/ReportBlock.vue'),
    reportFilters: () => import('@/components/ReportFilters.vue'),
    reportsPagination: () => import('@/components/ReportsPagination.vue'),
  },
  inject: [
    'loadReports',
  ],
  computed: {
    ...mapGetters({
      reports: 'reports/filteredReports',
      pagesCount: 'reports/pagesCount',
    }),
  },
  async mounted() {
    await this.loadReports();
    this.setTagFilterOptions();
  },
  methods: {
    ...mapActions({
      getReports: 'reports/getReports',
      setTagFilterOptions: 'reports/setTagFilterOptions',
    }),
  },
};
</script>
