import TextBox from "./components/TextBox";
import Arrows from "./components/Arrows";
import Button from "./components/Button";
import Modal from "./components/Modal";

const App = () => {
  return (
    <div className="App">
      <TextBox style="input" />
      <TextBox style="output" />
    </div>
  );
};

export default App;
