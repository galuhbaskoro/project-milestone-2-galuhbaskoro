import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import CategoriesModel from '../../interfaces/Categories';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriesNav = () => {

  const [categories, setCategories] = useState<CategoriesModel[]>([]);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      const response = await axios.get("https://api.escuelajs.co/api/v1/categories?limit=5");
      if(response.statusText =="OK"){
        setCategories(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [])
  
  return (
    
      <Button.Group 
        outline
        className='flex flex-wrap flex-col justify-center gap-3 md:flex-row md:gap-0'
      >
        <Button 
          color="gray"
          onClick={()=>{navigate("/")}}
          className='border border-gray-400 rounded-md md:[border: 1px 0px 1px 1px] md:rounded-r-none mb-3'
        >
          <span className='text-lg'>All Product</span>
        </Button>
        {categories.map((category)=>(
          <Button 
            key={category.id}
            color="gray"
            onClick={()=>{navigate(`/product/category/${category.id}`)}}
            className='border border-gray-400 rounded-md md:[border: 1px 0px 1px 0px] md:rounded-l-none md:rounded-r-none md:last:rounded-r-md md:border-l-0 mb-3'
          >
            <span className='text-lg'>{category.name}</span>     
          </Button>
        ))}
      </Button.Group>
  )

}

export default CategoriesNav;