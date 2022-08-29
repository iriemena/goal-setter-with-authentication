import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createGoal } from "../redux/goal/goalSlice";
import { toast } from "react-toastify";

function CreateGoal() {
  const dispatch = useDispatch();
  const { pending } = useSelector((state) => state.goals);

  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!text) {
      toast.error("Enter your goal");
    }
    dispatch(createGoal({ text }));

    setText("");
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="text"
            placeholder="Enter your goal"
            name="text"
            // required="true"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            type="submit"
            style={{ marginBottom: "13px" }}
            disabled={pending}
          >
            Add Goal{" "}
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
    </div>
  );
}

export default CreateGoal;
