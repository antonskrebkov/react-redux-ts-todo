import React from 'react';
import { Button, ListGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import trash from '../assets/images/trash.svg';
import ITodo from '../interfaces/ITodo';
import { useAppDispatch } from '../store/hooks';
import { toggleTodoHandler, removeTodoHandler } from '../store/todoSlice';
interface TodoItemProps {
  todo: ITodo,
}

export default function TodoItem( {todo} : TodoItemProps) {

  const dispatch = useAppDispatch()

  function deleteTodo(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo: ITodo) {
    event.stopPropagation();
    dispatch(removeTodoHandler(todo))
  }

  function setColorFromPriority(priorityCode: number): string {
    switch (priorityCode) {
      case 1 : return 'success';
      case 2 : return 'warning';
      case 3 : return 'danger';
      default : return 'success'
    }
  }
  
  return (
      <ListGroup.Item 
        onClick={() => dispatch(toggleTodoHandler(todo))} 
        key={todo.id} 
        className="todo-item d-flex justify-content-between align-items-center rounded mt-1 border-0" 
        variant={todo.completed ? "secondary" : setColorFromPriority(todo.priorityCode)}
      >
        <Form.Check className="d-none" type="checkbox"/>
        <div 
          className={todo.completed ? "text-decoration-line-through" : "text-decoration-none"}
        >
          {todo.title}
        </div>
        <div className="d-flex justify-content-center align-items-center gap-1">
          <Link 
            to={`/todos/${todo.id}`}
            className="open-todo text-decoration-none text-secondary d-flex px-1 justify-content-center align-items-center border border-1 rounded border-secondary"
            onClick={e => e.stopPropagation()}
          >
            Open
          </Link>
          <Button 
            className="remove-todo" 
            variant="none" 
            onClick={(e) => deleteTodo(e, todo)}
          >
            <img src={trash} alt="" />
          </Button>
        </div>
      </ListGroup.Item>
  )
}
