import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AboutProject from "./pages/AboutProject";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutProject />} />
      </Routes>
    </>
  );
}
