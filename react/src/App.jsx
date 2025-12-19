import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Hero from "./Hero";
import Canteen from "./Canteen";

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

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;