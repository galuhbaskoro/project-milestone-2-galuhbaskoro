import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ProductsModel from "../../interfaces/Products";

const ProductCart = () => {

  const data = JSON.parse(localStorage.getItem('cart') || '[]');
  const [cart, setCart] = useState<ProductsModel[]>(data);

  let number = 1;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  const removeCart = (id: number) => {
    // const cartIndex = cart.findIndex((item) => item.id == id);
    setCart((oldCart)=>{
      return oldCart.filter((cart) => cart.id !== id);
    })
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return (
    <React.Fragment>
      <div className="overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell><span className="text-lg">No.</span></TableHeadCell>
            <TableHeadCell><span className="text-lg">Image</span></TableHeadCell>
            <TableHeadCell><span className="text-lg">Title</span></TableHeadCell>
            <TableHeadCell><span className="text-lg">Category</span></TableHeadCell>
            <TableHeadCell><span className="text-lg">Price</span></TableHeadCell>
            <TableHeadCell><span className="text-lg">Actions</span></TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
              {cart.map((product, idx)=>(
                <TableRow key={idx}>
                  <TableCell><span className="text-xl">{number++}</span></TableCell>
                  <TableCell>{product.images[0]}</TableCell>
                  <TableCell><span className="text-lg">{product.title}</span></TableCell>
                  <TableCell><span className="text-lg">{product.category.name}</span></TableCell>
                  <TableCell><span className="text-lg">$ {product.price}.00</span></TableCell>
                  <TableCell>
                    <Button 
                      color='gray'
                      onClick={()=>removeCart(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </React.Fragment>
  )
}

export default ProductCart;
