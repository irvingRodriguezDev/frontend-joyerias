import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
import BranchesState from "./Context/Branches/BranchesState";
import UsersState from "./Context/Users/UsersState";
function App() {
  return (
    <AuthState>
      <BranchesState>
        <UsersState>
          <AppRouter />
        </UsersState>
      </BranchesState>
    </AuthState>
  );
}

export default App;
