import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import BranchesState from "./Context/Branches/BranchesState";
import UsersState from "./Context/Users/UsersState";
import CategoriesState from "./Context/Categories/CategoriesState";
import BusinessRulesState from "./Context/BusinessRule/BusinessRuleState";
import LinesState from "./Context/Lines/LinesState";
function App() {
  return (
    <AuthState>
      <BranchesState>
        <CategoriesState>
          <UsersState>
            <BusinessRulesState>
              <LinesState>
                <AppRouter />
              </LinesState>
            </BusinessRulesState>
          </UsersState>
        </CategoriesState>
      </BranchesState>
    </AuthState>
  );
}

export default App;
