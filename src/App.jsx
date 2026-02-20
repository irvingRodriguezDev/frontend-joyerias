import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import { ToastContainer } from "react-toastify";
import ToursState from "./Context/Tours/ToursState";

function App() {
  return (
    <AuthState>
      <ToursState>
        <ToastContainer />
        <AppRouter />
      </ToursState>
    </AuthState>
  );
}

export default App;
