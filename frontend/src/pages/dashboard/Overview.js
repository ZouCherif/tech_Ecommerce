import { ImCoinDollar } from "react-icons/im";
import { VscPerson, VscStarEmpty } from "react-icons/vsc";
import { RiArrowGoBackFill } from "react-icons/ri";
function Overview() {
  return (
    <div className="w-full bg-white py-4 px-6 rounded-md">
      <section className="flex mx-auto border-2 rounded-md">
        <div className="w-1/4 border-r-2 p-2">
          <h2 className="flex items-center mb-2">
            <ImCoinDollar className="mr-2" size={18} />
            Total Sales
          </h2>
          <p className="px-2 text-3xl font-bold mb-4">$1815.154</p>
          <p className="text-sm px-2">20.9% {"  "} +18.4k this week</p>
        </div>
        <div className="w-1/4 border-r-2 p-2">
          <h2 className="flex items-center mb-2">
            <VscPerson className="mr-2" size={20} />
            Visitors
          </h2>
          <p className="px-2 text-3xl font-bold mb-4">151106</p>
          <p className="text-sm px-2">2.9% {"  "} +9.4k this week</p>
        </div>
        <div className="w-1/4 border-r-2 p-2">
          <h2 className="flex items-center mb-2">
            <VscStarEmpty className="mr-2" size={20} />
            Total Orders
          </h2>
          <p className="px-2 text-3xl font-bold mb-4">1252</p>
          <p className="text-sm px-2">0.9% {"  "} +0.4k this week</p>
        </div>
        <div className="w-1/4 p-2">
          <h2 className="flex items-center mb-2">
            <RiArrowGoBackFill className="mr-2" size={15} />
            Refunded
          </h2>
          <p className="px-2 text-3xl font-bold mb-4">221</p>
          <p className="text-sm px-2">1.5% {"  "} -33 this week</p>
        </div>
      </section>
    </div>
  );
}

export default Overview;
