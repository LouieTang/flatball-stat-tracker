import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import NavBar from "./components/NavBar.js";
import Footer from "./components/Footer.js";
import TeamHomePage from "./pages/TeamHomePage.js";
import UserLoginPage from "./pages/UserLoginPage.js";
import UserRegisterPage from "./pages/UserRegisterPage.js";
import axios from "axios";
import {UserContextProvider} from "./contexts/userContext.js";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
        <Header />
        <NavBar />
        <Routes>
            <Route path="/" element={<UserLoginPage />} />
            <Route path="/register" element={<UserRegisterPage />} />
            <Route path="/team" element={<TeamHomePage />} />
        </Routes>
        <Footer />
    </UserContextProvider>
  );
};

export default App;
