import TodoItem from '../components/TodoItem';
import { Badge, Accordion, ListGroup } from 'react-bootstrap';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ITodo from '../interfaces/ITodo';

interface TodoListProps {
  eventKey: string,
  todoList: ITodo[],
  children: string,
}

export default function TodoList({ eventKey, todoList, children }: TodoListProps) {
  return (
    <Accordion.Item className="mb-3 rounded" eventKey={eventKey}>
      <Accordion.Header>
        <Badge bg="dark">{todoList.length}</Badge>
        <div className="mx-2">{children}</div>
      </Accordion.Header>
      <Accordion.Body className="p-0">
      <ListGroup>
        {!todoList.length && <ListGroup.Item>No tasks</ListGroup.Item>}
        <TransitionGroup>
          {todoList.map(todo => {
            return (
              <CSSTransition
                key={todo.id}
                timeout={200}
                classNames="todo"
              >
                <TodoItem 
                  key={todo.id} 
                  todo={todo}
                />
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  )
}
