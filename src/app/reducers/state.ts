import { TodoModel } from 'app/models'

export interface RootState {
  todos: TodoModel[];
  router?: any;
}
