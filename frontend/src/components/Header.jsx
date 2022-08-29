import { FaUserAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/auth/authSlice";
import { toast } from "react-toastify";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  function handleClick() {
    dispatch(logout());
    dispatch(reset());
    toast.success("Logout successful!");
    navigate("/login");
  }

  return (
    <header>
      <Container fluid>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand href="#">
              <Link to="/">Goal-Setter App</Link>
            </Navbar.Brand>
            <Nav className="ms-auto" align>
              <Nav.Link href="#">
                <FaUserAlt />
                <Link to="/register">Register</Link>
              </Nav.Link>
              {user ? (
                <>
                  <Nav.Link href="#">
                    <FaSignOutAlt />
                    <button onClick={handleClick}>Logout</button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  {" "}
                  <Nav.Link href="#">
                    <FaSignInAlt />
                    <Link to="/login">Login</Link>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
