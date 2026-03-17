import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import { ToastContainer } from "react-toastify";
import ToursState from "./Context/Tours/ToursState";
import CategoryUnitsState from "./Context/CategoryUnits/CategoryUnitsState";
import UnitsState from "./Context/Units/UnitState";
import QoutationState from "./Context/Quotation/QuotationState";
function App() {
  return (
    <AuthState>
      <ToursState>
        <CategoryUnitsState>
          <UnitsState>
            <QoutationState>
              <ToastContainer />
              <AppRouter />
            </QoutationState>
          </UnitsState>
        </CategoryUnitsState>
      </ToursState>
    </AuthState>
  );
}

export default App;
