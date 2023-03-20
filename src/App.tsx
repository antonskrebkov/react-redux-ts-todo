import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import DeletedTasks from './pages/DeletedTasks';
import TodoPage from './pages/TodoPage';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';

export default function App() {
  
  const isAuth = useAppSelector(state => state.auth.isAuth)

  return (  
    <BrowserRouter>
      {isAuth ?
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="todos" element={<MainPage />} />
            <Route path="deleted" element={<DeletedTasks />} />
            <Route path="todos/:id" element={<TodoPage />} />
          </Route>
          <Route 
            path="*" 
            element={<Navigate to="/todos" replace />}>
          </Route>
        </Routes>
      :
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="*"
              element={<Navigate to="/login" replace />}>
            </Route>
        </Routes>
      }
    </BrowserRouter>
)}