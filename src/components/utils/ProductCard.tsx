interface ProductCardProps {
  id: number,
  title: string,
  category: string,
  price: number,
  image: string,
  addCart: VoidFunction,
  viewDetail: VoidFunction,
}

const ProductCard = (props: ProductCardProps) => {

  return (
    <div className="flex flex-col rounded-2xl max-w-md lg:max-w-xs md:max-w-xs max-h-max bg-[#ffffff] shadow-xl">
      <figure className="flex justify-center items-center rounded-xl">
        <img 
          src={props.image} alt={`${props.title}-product-image`} 
          className="rounded-t-xl"
        />
      </figure>
      <div className="flex flex-col p-8">
        <div className="text-xl font-bold text-[#374151] h-24 pb-6">
          {props.title}
        </div>
        <div className=" text-xl text-[#374151]">
          {props.category}
        </div>
        <div className=" text-xl text-[#374151]">
          $ {props.price}.00
        </div>
        <div className="flex justify-start pt-6">
          <button
            type='button' 
            onClick={props.addCart}
            className="bg-[#1e6eb9] text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-[#175691] active:scale-95 transition-transform transform mr-3">
             Add to Cart
          </button>
          <button
            type='button' 
            onClick={props.viewDetail}
            className="bg-[#1e6eb9] text-[#ffffff]  font-bold text-base  p-3 rounded-lg hover:bg-[#175691] active:scale-95 transition-transform transform">
             View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
