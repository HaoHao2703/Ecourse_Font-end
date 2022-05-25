import { useEffect, useState } from "react";
import { Container, Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Apis, {endpoints} from '../configs/Apis';
import cookies from "react-cookies";
import { logoutUser } from "../ActionCreators/UserCreators";


export default function Header() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCategories = async () => {
      let res = await Apis.get(endpoints['categories']);
      setCategories(res.data)
      console.log(res.data)
    }
    loadCategories();
  }, []);

  const search = (e) => {
    e.preventDefault();
    navigate(`/?q=${query}`);
  }

  const logout = (event) => {
    event.preventDefault();
    cookies.remove("access token");
    cookies.remove("user");
    dispatch(logoutUser())
  }

  let path = (
    <>
      <Link className="nav-link" to="/login">Login</Link>
      <Link className="nav-link" to="/register">Register</Link>
    </>
  )

  if (user !== null && user !== undefined){
    path = (
      <>
         <Link className="nav-link" to="/">{user.username}</Link>
         <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
      </>
    )
  } 
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Ecourse Website</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">Home</Link>
            {categories.map(c => {
              let path = `/?category_id=${c.id}`;
              return <Link className="nav-link" to={path} key={c.id}>{c.name}</Link>
            })}
          </Nav>
          <Form className="d-flex" onSubmit={search}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button type="submit" variant="secondary">Search</Button>
          </Form>
          {path}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      )
}
