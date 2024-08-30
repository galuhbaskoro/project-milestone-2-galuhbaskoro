import { Route, Routes } from "react-router-dom";
import Products from "../components/contents/Products";
import ProductCategory from "../components/contents/ProductCategory";
import ProductCart from "../components/contents/ProductCart";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Products/>}/>
      <Route path="/product/category/:id" element={<ProductCategory/>}/>
      <Route path="/cart" element={<ProductCart/>}/>
    </Routes>
  );
}

export default Routing;