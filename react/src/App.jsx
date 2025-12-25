import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canteen from "./Canteen";
import PageTwo from "./PageTwo";
import Order from "./orderc";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Canteen />} />
        <Route path="/pagetwo" element={<PageTwo />} />
        <Route path="/orderc" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
