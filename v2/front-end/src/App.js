import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TeamsPage from "./pages/TeamsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TeamDataPage from "./pages/TeamDataPage";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/teams/:id" element={<TeamDataPage />}/>
        </Routes>
        <Footer />
    </>
  );
};

export default App;
