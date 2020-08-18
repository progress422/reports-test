<template lang="pug">
  .report-block
    .report-block__title {{model.title}}
    .report-block__tags
      .report-block__tag(
        v-for="(tag, index) in model.tags"
        :key="index"
      ) {{tag}}
    .report-block__description {{model.description}}
    button.report-block__save(
      v-if="model.isSaved"
      @click="onRemoveReportClick"
    ) Remove
    button.report-block__save(
      v-if="!model.isSaved"
      @click="onSaveReportClick"
    ) Save
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    model: {
      required: true,
      type: Object,
    },
  },
  methods: {
    onSaveReportClick() {
      this.saveReport(this.model);
    },
    onRemoveReportClick() {
      this.removeReport(this.model);
      this.$emit('reportRemoved');
    },
    ...mapMutations({
      saveReport: 'reports/SAVE_REPORT',
      removeReport: 'reports/REMOVE_REPORT',
    }),
  },
};
</script>
<style lang="scss" scoped>
.report-block {
  background-color: rgba(0,0,0,0.05);
  border-radius: 5px;
  border: 1px solid darkgray;
  padding: 20px;
  text-align: left;
  margin-bottom: 20px;
  &__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  &__tags {
    display: flex;
    align-items: center;
    margin: 0 -5px 10px;
  }
  &__tag {
    border: 1px solid;
    border-radius: 3px;
    margin: 0 5px;
    padding: 2px 10px;
  }
  &__description {
    max-height: 100px;
    overflow: auto;
  }
  &__save {
    margin-top: 10px;
    font-size: 16px;
    padding: 5px 10px;
    border: 1px solid;
    cursor: pointer;
    margin-left: auto;
    display: block;
    &:hover {
      background-color: rgba(0,0,0,0.1);
    }
  }
}
</style>
