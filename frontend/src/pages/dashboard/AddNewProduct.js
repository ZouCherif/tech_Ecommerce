import { useState } from "react";
import {
  useAddNewProductMutation,
  useGetCategoriesQuery,
} from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";

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
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [addProduct] = useAddNewProductMutation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addProduct(dataProd).unwrap();
      console.log(result);
      navigate("/dashboard/products");
    } catch (err) {
      console.log(err.data?.message);
    }
  };

  return (
    <div className="bg-white py-4 px-6 rounded-md">
      <form onSubmit={handleSubmit}>
        <label htmlFor="CatName" className="font-semibold">
          {" "}
          Product Name:
        </label>
        <input
          type="text"
          name="name"
          id="CatName"
          required
          value={dataProd.name}
          onChange={handleOnChange}
          placeholder="T-shirts, Shoes..."
          className="py-2 px-3 pr-10 text-gray-700 w-full focus:outline-none bg-stone-100 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-300 mr-6 mb-4 mt-2"
        />
        <label htmlFor="CatList" className="font-semibold mr-4">
          {" "}
          Category Name:
        </label>
        <select
          id="CatList"
          name="categoryName"
          onChange={handleOnChange}
          className="py-2 px-8 mb-2 bg-stone-100 border border-gray-300 rounded-lg text-lg font-semibold"
        >
          {data
            ? data.map((item) => <option>{item.name}</option>)
            : "fetshing..."}
        </select>
        <br />
        <label htmlFor="Price" className="font-semibold mr-4">
          {" "}
          Price :
        </label>
        <input
          type="text"
          name="price"
          id="Price"
          required
          value={dataProd.price}
          onChange={handleOnChange}
          placeholder="3000"
          className="py-2 px-3 text-gray-700 focus:outline-none bg-stone-100 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-300 mr-6 my-2"
        />
        <h2 className="font-semibold">Upload Pictures:</h2>
        <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div
                {...getRootProps()}
                className="bg-stone-100 w-1/2 rounded-lg font-semibold p-6 mx-auto my-4 h-40 flex justify-center items-center border-2 border-stone-500 border-dashed cursor-pointer"
              >
                <input {...getInputProps()} />
                <p className="flex">
                  <AiOutlineUpload size={20} className="mr-2" />
                  Drag and drop some files here, or click to select files
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <label htmlFor="Description" className="font-semibold">
          {" "}
          Descrption:
        </label>
        <textarea
          type="text"
          maxLength={5000}
          name="description"
          id="Description"
          value={dataProd.description}
          onChange={handleOnChange}
          placeholder="Describe your category here"
          className="py-2 px-3 pr-10 text-gray-700 w-full focus:outline-none bg-stone-100 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-300 mr-6 my-2 h-52"
        />

        <button
          type="submit"
          className="bg-green-400 p-2 text-sm rounded-lg flex items-center whitespace-nowrap hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-auto"
        >
          {/* <MdOutlineLibraryAdd size={15} className="mr-2" /> */}
          Add New Product
        </button>
      </form>
    </div>
  );
}

export default AddNewProduct;
