import CategoriesModel from "./Categories";

interface ProductsModel {
  id: number, 
  title: string,
  price: number,
  description: string,
  category: CategoriesModel,
  images: string[]
}

export default ProductsModel