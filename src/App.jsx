import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import DashboardState from "./Context/Dashboard/DashboardState";
import { ToastContainer } from "react-toastify";
import ToursState from "./Context/Tours/ToursState";

function App() {
  return (
    <AuthState>
      <DashboardState>
        <ToursState>
          <ToastContainer />
          <AppRouter />
        </ToursState>
      </DashboardState>
    </AuthState>
  );
}

export default App;
