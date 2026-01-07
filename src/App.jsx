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
import TransferState from "./Context/Transfer/TransferState";
import GramosState from "./Context/Gramos/GramosState";
import PiezasState from "./Context/Piezas/PiezasState";
function App() {
  return (
    <AuthState>
      <DashboardState>
        <GramosState>
          <PiezasState>
            <BranchesState>
              <CategoriesState>
                <UsersState>
                  <BusinessRulesState>
                    <LinesState>
                      <ProductsState>
                        <ClientsState>
                          <SalesState>
                            <DeparturesState>
                              <ReportsState>
                                <TransferState>
                                  <ToastContainer />
                                  <AppRouter />
                                </TransferState>
                              </ReportsState>
                            </DeparturesState>
                          </SalesState>
                        </ClientsState>
                      </ProductsState>
                    </LinesState>
                  </BusinessRulesState>
                </UsersState>
              </CategoriesState>
            </BranchesState>
          </PiezasState>
        </GramosState>
      </DashboardState>
    </AuthState>
  );
}

export default App;
