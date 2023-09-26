import { useState } from "react";
import { useAddNewProductMutation } from "../../api/apiSlice";

function AddNewProduct() {
  const [dataProd, setData] = useState({
    name: "",
    description: "",
    price: "",
    categoryName: "",
    sizes: [],
    colors: [],
    stock: "",
  });
  const [addProduct] = useAddNewProductMutation();
  return <div>AddNewProduct</div>;
}

export default AddNewProduct;
