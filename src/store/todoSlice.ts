import { toggleHandler, findTodo } from './../helpers/index';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import ITodo from '../interfaces/ITodo';

interface TodosState {
  productivityTodos: ITodo[],
  assignmentTodos: ITodo[],
  workTodos: ITodo[],
  deletedTodos: ITodo[],
  currentTodo: ITodo | null
}

const initialState: TodosState = {
  productivityTodos: [],
  assignmentTodos: [],
  workTodos: [],
  deletedTodos: [],
  currentTodo: null
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addNewTodoHandler(state, action: PayloadAction<ITodo>) {
      switch (action.payload.chapter) {
        case 'Productivity' : 
          state.productivityTodos.push(action.payload);
          break;
        case 'Assignments' : 
          state.assignmentTodos.push(action.payload);
          break;
        case 'Work' :
          state.workTodos.push(action.payload);
          break;
      }
    },
    toggleTodoHandler(state, action: PayloadAction<ITodo>) {
      switch (action.payload.chapter) {
        case 'Productivity' :
          toggleHandler(state.productivityTodos, action.payload.id)
          break;
        case 'Assignments' : 
          toggleHandler(state.assignmentTodos, action.payload.id)
          break;
        case 'Work' :
          toggleHandler(state.workTodos, action.payload.id)
          break;
      }
    },
    removeTodoHandler(state, action: PayloadAction<ITodo>) {
      switch (action.payload.chapter) {
        case 'Productivity' :
          state.deletedTodos.push(...state.productivityTodos.filter((todo: ITodo) => todo.id === action.payload.id))
          state.productivityTodos = state.productivityTodos.filter((todo: ITodo) => todo.id !== action.payload.id);
          break;
        case 'Assignments' : 
          state.deletedTodos.push(...state.assignmentTodos.filter((todo: ITodo) => todo.id === action.payload.id))
          state.assignmentTodos = state.assignmentTodos.filter((todo: ITodo) => todo.id !== action.payload.id);
          break;
        case 'Work' :
          state.deletedTodos.push(...state.workTodos.filter((todo: ITodo) => todo.id === action.payload.id))
          state.workTodos = state.workTodos.filter((todo: ITodo) => todo.id !== action.payload.id);
          break;
      }
    },
    findTodoHandler(state, action: PayloadAction<string>) {
      if (findTodo(state.productivityTodos, action.payload)) {
        state.currentTodo = findTodo(state.productivityTodos, action.payload)!
      } else if (findTodo(state.assignmentTodos, action.payload)) {
        state.currentTodo = findTodo(state.assignmentTodos, action.payload)!
      } else if (findTodo(state.workTodos, action.payload)) {
        state.currentTodo = findTodo(state.workTodos, action.payload)!
      }
    },
    restoreTodoHandler(state, action: PayloadAction<ITodo>) {
      switch (action.payload.chapter) {
        case 'Productivity' : 
        state.productivityTodos.push(action.payload);
          break;
        case 'Assignments' : 
          state.assignmentTodos.push(action.payload);
          break;
        case 'Work' : 
          state.workTodos.push(action.payload);
          break;
      }
      state.deletedTodos = state.deletedTodos.filter(current => current.id !== action.payload.id)
    },
    cleanDeletedTodos(state) {
      state.deletedTodos = [];
    },
    removeTodoFromDeletedListHandler(state, action: PayloadAction<ITodo>) {
      state.deletedTodos = state.deletedTodos.filter(current => current.id !== action.payload.id)
    },
  },
})

export const { 
  addNewTodoHandler,
  toggleTodoHandler, 
  removeTodoHandler, 
  findTodoHandler, 
  restoreTodoHandler, 
  cleanDeletedTodos,
  removeTodoFromDeletedListHandler
} = todoSlice.actions
export default todoSlice.reducer