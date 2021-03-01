class ApiFeatures {
  constructor(queryObj, requestQuery) {
    this.queryObj = queryObj;
    this.requestQuery = requestQuery;
  }

  filter() {
    const query_obj = { ...this.requestQuery };
    const execlude_feilds = ["page", "sort", "feilds", "limit"];
    execlude_feilds.forEach((el) => delete query_obj[el]);
    //adding $ operator and searching with the replaced version
    let query_string = JSON.stringify(query_obj);
    query_string = query_string.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.queryObj.find(JSON.parse(query_string));
    return this;
    //let query = this.queryObj.find(JSON.parse(query_string));
  }

  sort() {
    if (this.requestQuery.sort) {
      const sortby = this.requestQuery.sort.split(",").join(" ");
      this.queryObj = this.queryObj.sort(sortby);
    } else {
      this.queryObj = this.queryObj.sort("-price");
    }
    return this;
  }

  paginate() {
    const page = this.requestQuery.page * 1 - 1 || 0;
    const limit = this.requestQuery.limit * 1 || 3;
    const skip = limit * page;
    this.queryObj = this.queryObj.skip(skip).limit(limit);
    return this;
  }
}
module.exports = ApiFeatures;
