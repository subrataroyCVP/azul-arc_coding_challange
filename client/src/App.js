import "./App.css";
import { EmployeeProvider } from "./context/EmployeeContext";
import EmployeeList from "./components/EmployeeList";
import { CssBaseline } from "@mui/material";

function App() {
    return (
        <EmployeeProvider>
            <CssBaseline />
            <EmployeeList />
        </EmployeeProvider>
    );
}

export default App;
