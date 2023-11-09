import { Link, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import TeamsPage from "./pages/TeamsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/teams" element={<TeamsPage />} />
        </Routes>
        <Footer />
    </>
  );
};

export default App;
