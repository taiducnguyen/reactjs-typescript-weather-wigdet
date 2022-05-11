export const error = (state = {}, payload: any): Models.IErrorModel => {
  const { error } = payload
  if (!error) {
    return state
  }
  const formattedError: Models.IErrorModel = {}
  if (error.modelState) {
    formattedError.modelState = error.modelState
  }
  if (error.name === 'ValidationError' && error.path) {
    formattedError[error.path] = error.errors
  }
  if (error.message) {
    formattedError.message = error.message
  }
  return formattedError
}
