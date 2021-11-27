import { handleActions } from 'redux-actions'
import { TodoModel } from 'app/models'

const initialState: TodoModel[] = [
  {
    id: 1,
    text: 'Use Redux',
    completed: false
  }
]

export const todoReducer = handleActions<TodoModel[], TodoModel>(
  {

  },
  initialState
)
