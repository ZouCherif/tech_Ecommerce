import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../api/apiSlice";

function Categories() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  return (
    <div className="bg-white py-4 px-6 rounded-md">
      <div className="flex justify-between items-end">
        <h2 className="font-semibold">Your Store Categories</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Search categories..."
            className="py-2 px-3 pr-10 text-gray-700 w-full focus:outline-none bg-stone-100 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-300 mr-6"
          />
          <Link
            to="/dashboard/categories/addNewcategory"
            className="bg-green-400 p-2 text-sm rounded-lg flex items-center whitespace-nowrap hover:bg-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <MdOutlineLibraryAdd size={15} className="mr-2" />
            Add New Category
          </Link>
        </div>
      </div>
      <hr className="my-2" />
      <div className="text-gray-400 flex justify-around mb-2">
        <span>Category name</span>
        <span>CategoryID</span>
        <span>latest change</span>
        <span>creation date</span>
      </div>
      <div>{isLoading ? "...Loading" : data[0]._id}</div>
    </div>
  );
}

export default Categories;
