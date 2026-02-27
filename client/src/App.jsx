import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Impact from "./pages/Impact";
import Categories from "./pages/Categories";
import MissionDetails from "./pages/MissionDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/mission/:id" element={<MissionDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
