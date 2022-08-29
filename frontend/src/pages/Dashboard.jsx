import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateGoal from "../components/CreateGoal";
import { getGoals, reset, removeGoal } from "../redux/goal/goalSlice";
import CloseButton from "react-bootstrap/CloseButton";
import { Card, Col, Container, Row, Button } from "react-bootstrap";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { goals } = useSelector((state) => state.goals);
  const { error, message, pending } = useSelector((state) => state.goals);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (error) {
      console.log(message);
    }
    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, user, error, message]);

  return (
    <Container>
      <section
        style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}
      >
        <h4>Welcome back {user && user.name}</h4>
        <h5>Setup your goals here!</h5>
      </section>

      <CreateGoal />

      <section>
        <Row xs="1" sm="2" md={2} lg={2}>
          {goals.length > 0 ? (
            goals.map((goal) => (
              <Col style={{ marginBottom: "20px" }}>
                <Card className="text-center">
                  <Card.Header>
                    {new Date(goal.createdAt).toLocaleString("en-US")}
                    <CloseButton
                      onClick={() => dispatch(removeGoal(goal._id))}
                      style={{ float: "right" }}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <h2>{goal.text}</h2>{" "}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">
                    Created by {user.name}
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>You have not created any goal</p>
          )}
        </Row>
      </section>
    </Container>
  );
}

export default Dashboard;
