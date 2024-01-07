import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
      <ToastContainer />
    </div>
  );
}

export default App;
