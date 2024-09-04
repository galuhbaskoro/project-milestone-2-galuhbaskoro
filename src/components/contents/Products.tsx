import React, {useEffect, useState } from "react";
import axios from "axios";
import ProductsModel from "../../interfaces/Products";
import CategoriesNav from "../utils/CategoriesNav";
import ProductCard from "../utils/ProductCard";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Products = () => {

  const [products, setProducts] = useState<ProductsModel[]>([]);
  const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductsModel[]>(cartFromStorage);

  const login = localStorage.getItem('login');

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
    if(login !== null){
      setCart([...cart, {...product}]);
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'Please login to add product',
        showCancelButton: true
      }).then((result) => {
        if(result.isConfirmed){
          navigate('/login');
        }    
      })
    }
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
            viewDetail={()=> login !== null ? navigate(`/product/detail/${product.id}`) : 
            Swal.fire({
              icon: 'warning',
              title: 'Please login to view detail product',
              showCancelButton: true,
            }).then((result) => {
              if(result.isConfirmed){
                navigate('/login');
              }    
            })
          }
          />
        ))}
      </div>

    </React.Fragment>
  );
}

export default Products;