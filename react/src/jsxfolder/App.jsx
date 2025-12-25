import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canteen from "./Canteen";
import PageTwo from "./PageTwo";
import Order from "./orderc";

import Landing from "./Landing";
import Login from "./Login";
import ForgetPassword from "./ForgetPassword";
import ResetPassword from "./ResetPassword";
import Menu from "./Menu";
import Cart from "./Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/kitchen" element={<Canteen />} />
        <Route path="/pagetwo" element={<PageTwo />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
