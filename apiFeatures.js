class ApiFeatures {
  constructor(queryObj, requestQuery) {
    this.queryObj = queryObj;
    this.requestQuery = requestQuery;
  }
  filter() {
    const clean_object = { ...this.requestQuery };
    const execlude_feilds = ["page", "sort", "feilds", "limit"];
    execlude_feilds.forEach((el) => delete clean_object[el]);
    let query_string = JSON.stringify(clean_object);
    // adding $ operator
    query_string = query_string.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    this.queryObj.find(JSON.parse(query_string));
    return this;
  }

  sort() {
    if (this.requestQuery.sort) {
      const sortby = this.requestQuery.sort.spli(",").join(" ");
      this.queryObj = this.queryObj.sort(sortby);
    } else {
      this.queryObj = this.queryObj.sort("-rating");
    }
    return this;
  }
  limitFeilds() {
    if (this.requestQuery.feilds) {
      const feilds = this.requestQuery.feilds.split(",").join(" ");
      this.queryObj = this.queryObj.select(feilds);
    } else {
      this.queryObj = this.queryObj.select("title rating");
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
