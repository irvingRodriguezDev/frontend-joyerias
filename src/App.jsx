import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import BranchesState from "./Context/Branches/BranchesState";
import UsersState from "./Context/Users/UsersState";
import CategoriesState from "./Context/Categories/CategoriesState";
import BusinessRulesState from "./Context/BusinessRule/BusinessRuleState";
import LinesState from "./Context/Lines/LinesState";
import ProductsState from "./Context/Products/ProductsState";
import ClientsState from "./Context/Clients/ClientsState";
import SalesState from "./Context/Sales/SalesState";
import DashboardState from "./Context/Dashboard/DashboardState";
import { ToastContainer } from "react-toastify";
import DeparturesState from "./Context/Departures/DeparturesState";
import ReportsState from "./Context/Reports/ReportsState";
function App() {
  return (
    <AuthState>
      <BranchesState>
        <CategoriesState>
          <UsersState>
            <BusinessRulesState>
              <LinesState>
                <ProductsState>
                  <ClientsState>
                    <SalesState>
                      <DashboardState>
                        <DeparturesState>
                          <ReportsState>
                            <ToastContainer />
                            <AppRouter />
                          </ReportsState>
                        </DeparturesState>
                      </DashboardState>
                    </SalesState>
                  </ClientsState>
                </ProductsState>
              </LinesState>
            </BusinessRulesState>
          </UsersState>
        </CategoriesState>
      </BranchesState>
    </AuthState>
  );
}

export default App;
