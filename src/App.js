import "bootstrap/dist/css/bootstrap.min.css"; //변경
import "./css/App.css";
import "./css/my_reset.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main";
import Company from "./pages/Company";
import Ceo from "./pages/Ceo";
import Organization from "./pages/Organization";
import CI from "./pages/CI";
import ShopAll from "./pages/ShopAll";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

import { Route, Routes } from "react-router-dom";

//시작점
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shopall" element={<ShopAll />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<Products />} />

        <Route path="/company" element={<Company />}>
          <Route path="ceo" element={<Ceo />} />
          <Route path="organization" element={<Organization />} />
          <Route path="ci" element={<CI />} />
        </Route>
        {/* 다른 접근시 라우터 추가 */}
        <Route path="*" element={<h1>페이지가 없습니다.</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
