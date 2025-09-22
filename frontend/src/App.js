import "./App.css";
import Restaurants from "./components/Restaurants";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="App">
      <Restaurants />
    </Container>
  );
}

export default App;