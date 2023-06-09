import logo from '../../assets/images/logo.png'
import './Navbar.css'
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import ILink from '../../interfaces/ILink';
import { useAppDispatch } from '../../store/hooks';
import { logoutHandler } from '../../store/authSlice';

export default function NavBar() {

  const dispatch = useAppDispatch()

  const routes: ILink[] = [
    { name: 'Main Tasks', to: '/todos' },
    { name: 'Deleted Tasks', to: '/deleted' },
  ];

  return (
    <Navbar className="p-0 border-bottom border-2 border-secondary" bg="dark" variant="dark" expand="sm">
      <Container>
      <Navbar.Brand className="brand p-0 m-0" href="#home">
        <NavLink
          key="Main Page"
          to="/todos"
        >
          <img src={logo} className="logo h-75 w-75" alt="" />
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {routes.map((link: ILink) => {
              return (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className="link"
                >
                  {link.name}
                </NavLink>
              )
            })}
          </Nav>
          <Button 
            variant="none"
            className="link ms-auto m-0"
            onClick={() => dispatch(logoutHandler())}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
