import { Route, Routes } from "react-router-dom";
import Products from "../components/contents/Products";
import ProductCategory from "../components/contents/ProductCategory";
import ProductCart from "../components/contents/ProductCart";
import Register from "../components/contents/Register";
import Login from "../components/contents/Login";
import ProductDetail from "../components/contents/ProductDetail";
import ProtectedRoute from "../components/contents/ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Products/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/product/category/:id" element={<ProductCategory/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path="/product/detail/:id" element={<ProductDetail/>}/>
        <Route path="/cart" element={<ProductCart/>}/>
      </Route>
    </Routes>
  );
}

export default Routing;