import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductsModel from '../../interfaces/Products';
import { Button, Card } from 'flowbite-react';

const ProductDetail = () => {

  const {id} = useParams<{id: string}>();
  const [product, setProduct] = useState<ProductsModel[]>([]);

  const navigate = useNavigate()

  const cartFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductsModel[]>(cartFromStorage);

  const [productTitle, setProductTitle] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');
  const [productDescription, setproductDescription] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>(0);
  const [productImage, setProductImage] = useState<string>('');
  
  const getProductById = useCallback(async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      if(response.statusText =="OK"){
        setProduct(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  },[id]);

  const renderProductById = useCallback (async () => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      if(response.statusText =="OK"){
        setProductTitle(response.data['title']);
        setProductCategory(response.data['category']['name']);
        setproductDescription(response.data['description']);
        setProductPrice(response.data['price']);
        setProductImage(response.data['images'][0]);
      }
    } catch (error) {
      console.error(error);
    }
  },[id]);

  const addToCart = (product: any) => {
    setCart([...cart, {...product}]);
  }
  
  useEffect(()=>{
    renderProductById();
  },[renderProductById]);

  useEffect(() => {
    getProductById();
  }, [getProductById]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
}, [cart]);

  return(
    <div>
      <div className="flex flex-wrap items-start justify-center gap-6 mt-8">
        <Button
          color="gray"
          onClick={()=>navigate('/cart')}
          className="border border-gray-400 rounded-md md:[border: 1px 0px 1px 1px] mb-3"
        >
          <span className="text-xl">My Cart: {cart.length}</span>
        </Button>
      </div>

      <div className='flex flex-wrap flex-row justify-center w-full py-10'>
      <Card className="" imgSrc={productImage} horizontal>
        <h5 className="text-2xl font-bold tracking-tight text-gray-900">
          {productTitle}
        </h5>
        <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
          {productCategory}
        </p>
        <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
          {productDescription}
        </p>
        <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
          $ {productPrice}.00
        </p>
        <button
          type='button'
          onClick={() => addToCart(product)}
          className="bg-[#1e6eb9] text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-[#175691] active:scale-95 transition-transform transform mr-3">
          Add to Cart
        </button>
      </Card>
    </div>
    </div>

    
  );
}

export default ProductDetail;