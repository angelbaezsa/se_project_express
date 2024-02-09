class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 500;
  }
}
module.exports = DefaultError;
