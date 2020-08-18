<template lang="pug">
  .reports
    .container
      reports
</template>
<script>
import { mapActions } from 'vuex';

export default {
  components: {
    reports: () => import('@/components/Reports.vue'),
  },
  provide() {
    return {
      loadReports: this.loadReports,
    };
  },
  methods: {
    async loadReports() {
      await this.getReports(this.$route.query);
    },
    ...mapActions({
      getReports: 'reports/getReports',
    }),
  },
};
</script>
