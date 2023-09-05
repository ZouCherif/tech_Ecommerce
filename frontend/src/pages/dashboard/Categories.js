import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetCategoriesQuery } from "../../api/apiSlice";
import { useState } from "react";

function Categories() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredData = data
    ? data.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item._id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="bg-white py-4 px-6 rounded-md">
      <div className="flex justify-between items-end">
        <h2 className="font-semibold">Your Store Categories</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      <div className="text-gray-400 flex mb-2 px-1">
        <span className="w-1/12">index</span>
        <span className="w-1/6">Category name</span>
        <span className="w-1/4">CategoryID</span>
        <span className="w-1/4">latest change</span>
        <span className="w-1/5">creation date</span>
      </div>
      <div className="select-none">
        {isLoading
          ? "...Loading"
          : filteredData.length === 0
          ? "No Categories Available"
          : filteredData.map((item, index) => (
              <div className="flex hover:bg-stone-200 py-2 px-1">
                <span className="w-1/12">{index + 1}</span>
                <span className="w-1/6">{item.name}</span>
                <span className="w-1/4">{item._id}</span>
                <span className="w-1/4">{item.updatedAt}</span>
                <span className="w-1/5">{item.createdAt}</span>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Categories;
