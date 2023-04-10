import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/home";
import AddUser from "./pages/adduser";
import EditUser from "./pages/edituser";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route path="/adduser" Component={AddUser} />
          <Route path="/update/:id" Component={EditUser} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
