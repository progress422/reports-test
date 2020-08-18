<template lang="pug">
  .reports-pagination
    .container
      .reports-pagination__wrapper
        button.reports-pagination__item(
          v-for="(page, index) in pages"
          :key="index"
          :disabled="page === activePage"
          @click="selectPage(page)"
        ) {{page}}
</template>
<script>
export default {
  props: {
    pages: Number,
  },
  computed: {
    activePage() {
      return +this.$route.query.page || 1;
    },
  },
  methods: {
    selectPage(page) {
      if (this.activePage === page) return;
      this.$router.replace({
        query: {
          ...this.$route.query,
          page,
        },
      });
      this.$emit('paginationChange');
    },
  },
};
</script>
<style lang="scss" scoped>
.reports-pagination {
  margin-bottom: 20px;
  &__item {
    margin: 0 5px;
    cursor: pointer;
    &[disabled] {
      cursor: auto;
    }
  }
}
</style>
