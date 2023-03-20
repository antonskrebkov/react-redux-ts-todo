import '../assets/App.css'
import { Accordion } from 'react-bootstrap';
import CreateTodo from '../components/CreateTodo';
import TodoList from '../components/TodoList';
import { useAppSelector } from '../store/hooks';
import { sortTodos } from './../helpers/index';

export default function MainPage() {

  const productivityTodos = (useAppSelector(state => sortTodos(state.todos.productivityTodos)))
  const assignmentTodos = (useAppSelector(state => sortTodos(state.todos.assignmentTodos)))
  const workTodos = (useAppSelector(state => sortTodos(state.todos.workTodos)))

  return (
    <div className="App mt-4">
      <CreateTodo></CreateTodo>
      <Accordion className="mt-4" alwaysOpen>
          <TodoList 
            eventKey="0"
            todoList={productivityTodos}
          >
            Productivity
          </TodoList>
          <TodoList 
            eventKey="1"
            todoList={assignmentTodos} 
          >
            Assignment
          </TodoList>
          <TodoList 
            eventKey="2"
            todoList={workTodos} 
          >
            Work
          </TodoList>
      </Accordion>
    </div>
  );
}