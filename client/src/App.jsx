import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Impact from "./pages/Impact";
import Categories from "./pages/Categories";
import MissionDetails from "./pages/MissionDetails";
import LearnMore from "./pages/LearnMore";
import SuggestCause from "./pages/SuggestCause";
import CustomFundraiser from "./pages/CustomFundraiser";
import AllDonors from "./pages/AllDonors";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/mission/:id" element={<MissionDetails />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/suggest-cause" element={<SuggestCause />} />
        <Route path="/fundraiser" element={<CustomFundraiser />} />
        <Route path="/donors" element={<AllDonors />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
