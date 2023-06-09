import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import { formatDate, setChapterImage } from '../helpers';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { findTodoHandler } from '../store/todoSlice';

export default function TodoPage() {

  const {id} = useParams()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const todo = useAppSelector(state => state.todos.currentTodo)
  const [date, setDate] = useState<string>('-')
  const [image, setImage] = useState<string>('')

  const goBack = () => navigate(-1)

  function setPriority(priorityCode: number): {name: string, color: string} {
    switch (priorityCode) {
      case 1 : return {name: 'Low', color: 'text-success'};
      case 2 : return {name: 'Medium', color: 'text-warning'};
      case 3 : return {name: 'High', color: 'text-danger'};
      default : return {name: 'Low', color: 'text-success'}
    }
  }      

  useEffect(() => {
    if (id) {
      dispatch(findTodoHandler(id))
    }
  }, [id])

  useEffect(() => {
    if (todo) {
      setDate(formatDate(todo))
      setChapterImage(todo, setImage)
    }
  }, [todo])
  
  return (
    <>
      <Button className="mt-4" variant="light" onClick={goBack}>Back</Button>
      { todo && 
      <Card className="mt-4 mb-0 mx-auto" style={{ maxWidth: "400px" }}>
        <Card.Img variant="top" className="my-0 mx-auto w-50" src={image} />
        <Card.Header className="fw-bold text-center">{todo.chapter}</Card.Header>
        <Card.Body >
          <Card.Title className={setPriority(todo.cachedPriorityCode).color}><span className="fw-bold">Priority: </span>{setPriority(todo.cachedPriorityCode).name}</Card.Title>
          <Card.Title className={todo.completed ? "text-success" : "text-danger"}><span className="fw-bold">Status: </span>{todo.completed ? "Done" : "Not done"}</Card.Title>
          <Card.Text><span className="fw-bold">Todo: </span>{todo.title}</Card.Text>
        </Card.Body>
        {date &&
          <Card.Footer><span className="fw-bold">Added at: </span>{date}</Card.Footer>
        }
      </Card>
      }
    </>
  )
}
