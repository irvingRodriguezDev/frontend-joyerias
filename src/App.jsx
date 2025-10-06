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
                    <AppRouter />
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
