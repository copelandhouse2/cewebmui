class myError extends Error {
  constructor(...args) {
      super(...args)
      Error.captureStackTrace(this, myError)
  }
}

export default (myError);