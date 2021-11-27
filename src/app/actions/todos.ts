import { Dispatch } from 'redux'

export const addTodo = (text: string) => (dispatch: Dispatch) => {
  dispatch({
    type: 'ADD_TODO',
    payload: {
      text
    }
  })
}
