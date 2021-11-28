export const error = (state = {}, aciton: any) => {
  const { error } = aciton.payload
  if (!error) {
    return state
  }
  if (error.modelState) {
    return error.modelState
  }
  if (error.name === 'ValidationError' && error.path) {
    return {
      [error.path]: error.errors
    }
  }
  return state
}
