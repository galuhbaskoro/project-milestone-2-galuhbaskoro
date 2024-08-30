import React, {useEffect, useState } from "react";
import axios from "axios";
import ProductsModel from "../../interfaces/Products";
import CategoriesNav from "../utils/CategoriesNav";
import ProductCard from "../utils/ProductCard";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const Products = () => {

  const [products, setProducts] = useState<ProductsModel[]>([]);
  const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductsModel[]>(cartFromStorage);

  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/products?limit=10&offset=0");
      if(response.statusText =="OK"){
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    getAllProducts();
  },[]);

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);
  
  const addToCart = (product: ProductsModel) => {
    setCart([...cart, {...product}]);
  }
  
  return(
    <React.Fragment>
      
      <CategoriesNav/>

      <div className="flex flex-wrap items-start justify-center gap-6 mt-8">
        <Button
          color="gray"
          onClick={()=>navigate('/cart')}
          className="border border-gray-400 rounded-md md:[border: 1px 0px 1px 1px] mb-3"
        >
          <span className="text-xl">My Cart: {cart.length}</span>
        </Button>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-6 mt-8">
        {products.map((product)=>(
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            category={product.category.name}
            price={product.price}
            image={product.images[0]}
            addCart={() => addToCart(product)}
          />
        ))}
      </div>

    </React.Fragment>
  );
}

export default Products;