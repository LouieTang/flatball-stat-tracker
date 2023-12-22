import { Route, Routes } from "react-router-dom";
import TeamsPage from "./pages/TeamsPage.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import TeamDataPage from "./pages/TeamDataPage.js";
import HomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import TeamPage from "./pages/TeamPage.js";
import CreateTeamPage from "./pages/CreateTeamPage.js";
import AddPlayersPage from "./pages/AddPlayersPage.js";
import NewMatch from "./pages/NewMatch.js";
import GameController from "./pages/GameController.js";
import Team from "./pages/Team.js";

function App() {
  return (
    <>
        <Header />
        <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/" element={<Team />} />
            <Route path="/testmatch" element={<GameController />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/team" element={<TeamPage />} />
            <Route path="/createteam" element={<CreateTeamPage />} />
            <Route path="/addplayers" element={<AddPlayersPage />} />

            <Route path="/newmatch" element={<NewMatch />} />


            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDataPage />}/>
        </Routes>
        <Footer />
    </>
  );
};

export default App;
