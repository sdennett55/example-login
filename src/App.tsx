import GlobalStateProvider from "./components/GlobalStateProvider";
import { Login } from "./components/Login";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <GlobalStateProvider>
        {" "}
        <Login />
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

export default App;
