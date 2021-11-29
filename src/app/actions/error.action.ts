import { Dispatch } from 'redux'

export const catchError = (ex: any, onError: Function) => (dispatch: Dispatch) => {
  console.log(ex)
  if (ex.response) {
    ex.response.json().then((error: any) => dispatch(onError(error)))
  } else {
    dispatch(onError(ex))
  }
}
