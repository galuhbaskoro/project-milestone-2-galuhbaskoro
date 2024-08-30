import React, { useCallback, useEffect, useState } from 'react'
import ProductsModel from '../../interfaces/Products';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriesNav from '../utils/CategoriesNav';
import ProductCard from '../utils/ProductCard';
import { Button } from 'flowbite-react';

const ProductCategory = () => {

  const {id} = useParams<{id: string}>();

  const [products, setProducts] = useState<ProductsModel[]>([]);
  const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductsModel[]>(cartFromStorage);

  const navigate = useNavigate();

  const getAllProducts = useCallback( async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${id}/products?limit=5&offset=0`);
      if(response.statusText =="OK"){
        setProducts(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  },[id]);

  useEffect(()=>{
    getAllProducts();
  },[getAllProducts]);

  useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);
  
  const addToCart = (product: ProductsModel) => {
    setCart([...cart, {...product}]);
  }
  
  return (
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

      <div className="flex flex-wrap items-start justify-center gap-5 mt-8">
        {products.map((product, idx)=>(
          <ProductCard 
            key={idx}
            id={product.id}
            title={product.title}
            category={product.category.name}
            price={product.price}
            image={product.images[0]}
            addCart={()=> addToCart(product)}
          />
        ))}
      </div>
    </React.Fragment> 
  )
}

export default ProductCategory;
