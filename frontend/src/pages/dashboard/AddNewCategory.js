import { useAddNewCategoryMutation } from "../../api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { clearUserInfo, setUserInfo } from "../features/User/userSlice";

function AddNewCategory() {
  const [dataCat, setData] = useState({
    name: "",
    description: "",
  });
  const [addCategory] = useAddNewCategoryMutation();

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
      console.log(dataCat);
      //   const result = await addCategory(dataCat).unwrap();
      //   console.log(result);
    } catch (err) {
      console.log("errrrr");
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
