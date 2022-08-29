import { Container, Form, Button, Spinner } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../redux/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Spinners from "../components/Spinner";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, pending, error, success, message } = useSelector(
    (state) => state.user
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    if (success) {
      toast.success("Registration Successful!");
      navigate("/");
    }

    dispatch(reset());
  }, [dispatch, navigate, error, success, message]);

  const { name, email, password, password2 } = formData;

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Ooops! Password do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  }

  return (
    <>
      <Container fluid>
        <div className="reg-align">
          <h3>
            <FaUserAlt />
            REGISTER
          </h3>
          <p>Please, register your details here</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter fullname"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
            />
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" disabled={pending}>
              Submit{" "}
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

export default Register;
