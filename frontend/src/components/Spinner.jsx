import { Spinner } from "react-bootstrap";

function Spinners() {
  return (
    <Spinner animation="border" role="status" variant="primary">
      <span className="visually-hidden spinner">Loading...</span>
    </Spinner>
  );
}

export default Spinners;
