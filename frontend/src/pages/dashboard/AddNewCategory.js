import { useAddNewCategoryMutation } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { AiOutlineUpload } from "react-icons/ai";

function AddNewCategory() {
  const [dataCat, setData] = useState({
    name: "",
    description: "",
  });
  const [addCategory] = useAddNewCategoryMutation();
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
      const result = await addCategory(dataCat).unwrap();
      console.log(result);
      navigate("/dashboard/categories");
    } catch (err) {
      console.log(err.data?.message);
    }
  };
  return (
    <div className="bg-white py-4 px-6 rounded-md">
      <form onSubmit={handleSubmit}>
        <label htmlFor="CatName" className="font-semibold">
          {" "}
          Category Name:
        </label>
        <input
          type="text"
          name="name"
          id="CatName"
          required
          value={dataCat.name}
          onChange={handleOnChange}
          placeholder="T-shirts, Shoes..."
          className="py-2 px-3 pr-10 text-gray-700 w-full focus:outline-none bg-stone-100 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-300 mr-6 my-2"
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
          value={dataCat.description}
          onChange={handleOnChange}
          placeholder="Describe your category here"
          className="py-2 px-3 pr-10 text-gray-700 w-full focus:outline-none bg-stone-100 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-300 mr-6 my-2 h-52"
        />

        <button
          type="submit"
          className="bg-green-400 p-2 text-sm rounded-lg flex items-center whitespace-nowrap hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 ml-auto"
        >
          {/* <MdOutlineLibraryAdd size={15} className="mr-2" /> */}
          Add New Category
        </button>
      </form>
    </div>
  );
}

export default AddNewCategory;
