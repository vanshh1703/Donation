import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Impact from "./pages/Impact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impact" element={<Impact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
