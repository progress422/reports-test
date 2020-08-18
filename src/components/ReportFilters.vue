<template lang="pug">
  .report-filters
    .container
      .report-filters__wrapper
        div Filters:
        select(
          @change="onTagFilterChange"
        ).report-filters__filter
          option(:value="null") Filter by Tag
          option(
            v-for="(tag, index) in tags"
            :key="index"
            :selected="$route.query.tag === tag"
          ) {{tag}}
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      tags: 'reports/filterTagOptions',
    }),
  },
  methods: {
    onTagFilterChange(event) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          tag: event.target.value || undefined,
          page: undefined,
        },
      });
      this.$emit('filterChange');
    },
  },
};
</script>
<style lang="scss" scoped>
.report-filters {
  text-align: left;
  padding: 10px 0;
  &__wrapper {
    display: flex;
    align-items: center;
  }
  &__filter {
    margin-left: 10px;
    min-width: 50px;
  }
}
</style>
