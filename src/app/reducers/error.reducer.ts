import { IErrorModel } from 'app/models'

export const error = (state = {}, payload: any): IErrorModel => {
  const { error } = payload
  if (!error) {
    return state
  }
  const formattedError: IErrorModel = {}
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
