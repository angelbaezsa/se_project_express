const SUCCESSFUL = {
  status: "Done!",
};
const INVALID_DATA = {
  status: "BadRequest",
  error: 400,
};

const UNAUTHORIZED = {
  status: "Unauthorized",
  error: 401,
};

const FORBIDDEN = {
  status: "Forbidden",
  error: 403,
};

const NOTFOUND = {
  status: "NotFound",
  error: 404,
};

const DUPLICATED = {
  status: "Email already in use",
  error: 409,
};

const DEFAULT = {
  status: "InternalServerError",
  error: 500,
};

module.exports = {
  INVALID_DATA,
  NOTFOUND,
  DEFAULT,
  UNAUTHORIZED,
  SUCCESSFUL,
  DUPLICATED,
  FORBIDDEN,
};
