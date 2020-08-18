<template lang="pug">
  .report-create
    .container
      .report-create__wrapper
        form.report-create__form(
          @submit.prevent="onReportCreate"
        )
          .report-create__input-wrapper
            h2 Title:
            input(
              placeholder="Title"
              v-model="model.title"
              type="text"
            )
          .report-create__input-wrapper
            h2 Description:
            textarea(
              placeholder="description"
              v-model="model.description"
              rows="4"
            )
          .report-create__input-wrapper
            h2 Tags:
            .report-create__tag(
              v-for="(tag, index) in model.tags"
              :key="index"
            )
              input(
                placeholder="Title"
                v-model="model.tags[index]"
                type="text"
              )
            button(
              @click.prevent="addTag"
            ) Add new tag
          button(
            type="submit"
          ) Create report
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  data: () => ({
    model: {
      tags: [''],
    },
  }),
  methods: {
    addTag() {
      this.model.tags.push('');
    },
    onReportCreate() {
      this.saveReport(this.model);
    },
    ...mapMutations({
      saveReport: 'reports/SAVE_REPORT',
    }),
  },
};
</script>
<style lang="scss" scoped>
.report-create {
  text-align: left;
  &__form {
    display: flex;
    max-width: 300px;
    margin: 0 auto;
    flex-direction: column;
  }
  &__input-wrapper {
    margin-bottom: 10px;
    h2 {
      font-size: 16px;
      margin: 0;
    }
    input,
    textarea {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
</style>
