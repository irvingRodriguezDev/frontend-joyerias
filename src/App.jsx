import "./App.css";
import AppRouter from "./routes/AppRouter";
import AuthState from "./Context/Auth/AuthState";
function App() {
  return (
    <AuthState>
      <AppRouter />
    </AuthState>
  );
}

export default App;
