class DuplicatedError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicatedEmail";
    this.statusCode = 409;
  }
}

module.exports = DuplicatedError;
