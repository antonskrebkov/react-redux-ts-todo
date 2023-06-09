import { Button, ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import trash from '../assets/images/trash.svg';
import ITodo from '../interfaces/ITodo';
import { formatDate } from '../helpers';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { restoreTodoHandler, cleanDeletedTodos, removeTodoFromDeletedListHandler } from '../store/todoSlice';

export default function DeletedTasks() {

  const dispatch = useAppDispatch();
  const deletedTodos = (useAppSelector(state => state.todos.deletedTodos))

  function deleteTodo(todo: ITodo, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.stopPropagation();
    dispatch(removeTodoFromDeletedListHandler(todo))
  }

  function cleanDeleted() {
    let confirmation: boolean = window.confirm('Are you sure you want to clear the entire list?')
    
    if (confirmation === true) {
      dispatch(cleanDeletedTodos())
    }
  }

  return (
    <div className="mt-4">
      <Button variant="danger" onClick={cleanDeleted}>Clean all</Button>
      <ListGroup className="mt-4">
          {!deletedTodos.length && <ListGroup.Item className="rounded">No tasks</ListGroup.Item>}
        <TransitionGroup>
          {deletedTodos.map(todo => {
            return (
              <CSSTransition
                key={todo.id}
                timeout={200}
                classNames="todo"
              >
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="button-tooltip">
                      Added at: {formatDate(todo)}
                    </Tooltip>
                  }
                >
                  <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center rounded mb-2" variant="secondary">
                    <div className="todoTitle">{todo.chapter}: {todo.title}</div>
                    <div className="d-flex justify-content-center align-items-center gap-1">
                      <Button 
                        className="open-todo text-decoration-none text-secondary d-flex px-1 justify-content-center align-items-center border border-1 rounded border-secondary"
                        variant="none"
                        onClick={() => dispatch(restoreTodoHandler(todo))}
                      >
                        Restore
                      </Button>
                        <Button 
                          className="remove-todo" 
                          variant="none" 
                          onClick={(e) => deleteTodo(todo, e)}
                        >
                          <img src={trash} alt="" />
                        </Button>
                    </div>
                  </ListGroup.Item>
                </OverlayTrigger>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </ListGroup>
    </div>
  )
}
