import { Route, Routes } from "react-router-dom";
// import MainPage from "./pages/MainPage";
import TeamsPage from "./pages/TeamsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TeamDataPage from "./pages/TeamDataPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />


            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDataPage />}/>
        </Routes>
        <Footer />
    </>
  );
};

export default App;
