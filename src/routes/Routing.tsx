import { Route, Routes } from "react-router-dom";
import Products from "../components/contents/Products";
import ProductCategory from "../components/contents/ProductCategory";
import ProductCart from "../components/contents/ProductCart";
import Register from "../components/contents/Register";
import Login from "../components/contents/Login";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Products/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/product/category/:id" element={<ProductCategory/>}/>
      <Route path="/cart" element={<ProductCart/>}/>
    </Routes>
  );
}

export default Routing;