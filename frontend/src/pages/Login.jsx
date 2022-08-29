import { Container, Form, Button, Spinner } from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinners from "../components/Spinner";
import { login, reset } from "../redux/auth/authSlice";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, pending, error, success, message } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    if (success) {
      toast.success("Login Successful!");
      navigate("/");
    }

    dispatch(reset());
  }, [dispatch, navigate, error, success, message]);

  const { email, password } = formData;

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const userData = { email, password };

    dispatch(login(userData));
  }

  return (
    <>
      <Container>
        <div className="login-align">
          <h3>
            <FaSignInAlt />
            LOGIN
          </h3>
          <p>Please, login to start setting goals</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" disabled={pending}>
              Login{" "}
              {pending ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : null}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default Login;
