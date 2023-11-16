import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={!user ? <Login /> : <Home />} />
          <Route
            path="/auth/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/auth/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
