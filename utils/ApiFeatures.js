module.exports = function ApiFeatures(Model, QueryString) {
  //FILTER
  let queryStr = { ...QueryString };
  const exclude = ["sort", "fields", "page", "limit"];
  exclude.forEach((el) => {
    delete queryStr[el];
  });
  queryStr = JSON.stringify(queryStr).replace(
    /\bgt|gte|lt|lte\b/g,
    (match) => `$${match}`
  );

  let query = Model.find(JSON.parse(queryStr));

  //SORT
  if (QueryString.sort) {
    const sortby = QueryString.sort.split(",").join(" ");
    query = query.sort(sortby);
  } else {
    query = query.sort("-rating");
  }

  //LIMIT FIELDS
  if (QueryString.fields) {
    const field = QueryString.fields.split(",").join(" ");
    query = query.select(JSON.parse(field));
  } else {
    query = query.select("-__v");
  }

  //PAGINATE
  if (QueryString.page) {
    const skipval = (+QueryString.page - 1) * +QueryString.limit;
    query = query.skip(skipval).limit(+QueryString.limit);
  } else {
    if (QueryString.limit) query = query.skip(0).limit(+QueryString.limit);
    else query = query.skip(0).limit(2);
  }

  return query;
};
