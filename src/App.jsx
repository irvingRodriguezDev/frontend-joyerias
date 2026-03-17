import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import { ToastContainer } from "react-toastify";
import ToursState from "./Context/Tours/ToursState";
import CategoryUnitsState from "./Context/CategoryUnits/CategoryUnitsState";
function App() {
  return (
    <AuthState>
      <ToursState>
        <CategoryUnitsState>
          <ToastContainer />
          <AppRouter />
        </CategoryUnitsState>
      </ToursState>
    </AuthState>
  );
}

export default App;
