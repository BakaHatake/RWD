import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canteen from "./Canteen";
import PageTwo from "./PageTwo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Canteen />
              
            </>
          }
        />
      <Route path="/pagetwo" element={<PageTwo />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;