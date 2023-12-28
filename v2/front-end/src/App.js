import { Route, Routes } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import TeamHomePage from "./pages/TeamHomePage.js";

function App() {
  return (
    <>
        <Header />
        <Routes>
            <Route path="/" element={<TeamHomePage />} />
        </Routes>
        <Footer />
    </>
  );
};

export default App;
