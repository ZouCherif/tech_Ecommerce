import { ImCoinDollar } from "react-icons/im";
import { VscPerson, VscStarEmpty } from "react-icons/vsc";
import { RiArrowGoBackFill } from "react-icons/ri";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

function Overview() {
  const data = [
    { name: "jan", revenue: 32, orders: 10 },
    { name: "feb", revenue: 35, orders: 15 },
    { name: "mar", revenue: 68, orders: 20 },
    { name: "apr", revenue: 55, orders: 22 },
    { name: "may", revenue: 80, orders: 35 },
    { name: "jun", revenue: 75, orders: 40 },
    { name: "jul", revenue: 120, orders: 42 },
    { name: "aug", revenue: 220, orders: 45 },
    { name: "sep", revenue: 180, orders: 60 },
    { name: "oct", revenue: 240, orders: 70 },
    { name: "sep", revenue: 280, orders: 64 },
    { name: "dec", revenue: 311, orders: 71 },
  ];
  return (
    <div className="w-full bg-white py-4 px-6 rounded-md">
      <section className="flex mx-auto border-2 rounded-md mb-6">
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
      <section className="">
        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="revenue" stroke="#2196F3" />
          <Line type="monotone" dataKey="orders" stroke="#F44236" />
        </LineChart>
      </section>
    </div>
  );
}

export default Overview;
