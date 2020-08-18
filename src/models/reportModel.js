export default class ReportModel {
  constructor(model) {
    this.id = model.id;
    this.title = model.title;
    this.description = model.description;
    this.tags = model.tags || [];
    this.index = model.index;
    this.isSaved = model.isSaved;
  }
}
