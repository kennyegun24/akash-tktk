import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import { useSelector } from "react-redux";
import Redirect from "./pages/auth/Redirect";
import UploadSuccess from "./pages/UploadSuccess";

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to={"/"} /> : <Login />}
      />
      <Route
        path="/"
        index
        element={currentUser ? <Home /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/oauth/redirect"
        element={!currentUser ? <Redirect /> : <Navigate to={"/"} />}
      />
      <Route
        path="/video/upload/success"
        element={currentUser ? <UploadSuccess /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
}

export default App;
