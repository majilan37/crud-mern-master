import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Dashborad from "./pages/Dashborad";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import UpdateTodo from "./pages/UpdateTodo";

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        {/* private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashborad />} />
          <Route path="/todos/:id" element={<UpdateTodo />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
