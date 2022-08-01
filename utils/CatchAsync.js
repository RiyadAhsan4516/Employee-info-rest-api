const CatchAsync = (func) => {
  return (res, req, next) => {
    func(res, req, next).catch((err) => next(err));
  };
};

module.exports = CatchAsync;
