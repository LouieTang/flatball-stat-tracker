import { Route, Routes } from "react-router-dom";
import TeamsPage from "./pages/TeamsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TeamDataPage from "./pages/TeamDataPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TeamPage from "./pages/TeamPage";
import CreateTeamPage from "./pages/CreateTeamPage";
import AddPlayersPage from "./pages/AddPlayersPage";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/team" element={<TeamPage />} />
            <Route path="/createteam" element={<CreateTeamPage />} />
            <Route path="/addplayers" element={<AddPlayersPage />} />


            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDataPage />}/>
        </Routes>
        <Footer />
    </>
  );
};

export default App;
