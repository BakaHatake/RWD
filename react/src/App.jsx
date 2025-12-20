import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Hero from "./Hero";
import Canteen from "./Canteen";
import PageTwo from "./PageTwo";
import Order from "./orderc";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Canteen />
              
            </>
          }
        />
      <Route path="/pagetwo" element={<PageTwo />} />
      <Route path="*" element={<Order />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;