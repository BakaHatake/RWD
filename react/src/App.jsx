import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canteen from "./Canteen";
import PageTwo from "./PageTwo";
import Order from "./orderc";
import Profile from "./profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Canteen />} />
        <Route path="/pagetwo" element={<PageTwo />} />
        <Route path="/order" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
