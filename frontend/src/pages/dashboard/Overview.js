import { ImCoinDollar } from "react-icons/im";
import { VscPerson, VscStarEmpty } from "react-icons/vsc";
import { RiArrowGoBackFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  PolarGrid,
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

  const data0 = [
    {
      name: "Group A",
      value: 400,
      fill: "#54FF24",
    },
    {
      name: "Group B",
      value: 300,
      fill: "#eb4034",
    },
    {
      name: "Group C",
      value: 120,
      fill: "#349feb",
    },
    {
      name: "Group D",
      value: 30,
      fill: "#190830",
    },
    {
      name: "Group E",
      value: 550,
      fill: "#37472e",
    },
  ];
  return (
    <div className="bg-white py-4 px-6 rounded-md">
      <section className="flex mx-auto border-2 rounded-md mb-6">
        <div className="w-1/4 border-r-2 p-2">
          <h2 className="flex items-center mb-2">
            <ImCoinDollar className="mr-2" size={18} />
            Total Sales
          </h2>
          <div className="flex justify-between items-start ">
            <p className="px-2 text-3xl font-bold">$1815.154</p>
            <LineChart width={70} height={50} data={data}>
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2196F3"
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </div>
          <p className="text-sm px-2">20.9% {"  "} +18.4k this week</p>
        </div>
        <div className="w-1/4 border-r-2 p-2">
          <h2 className="flex items-center mb-2">
            <VscPerson className="mr-2" size={20} />
            Visitors
          </h2>
          <div className="flex justify-between items-start ">
            <p className="px-2 text-3xl font-bold">151106</p>
            <LineChart width={70} height={50} data={data}>
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2196F3"
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </div>
          <p className="text-sm px-2">2.9% {"  "} +9.4k this week</p>
        </div>
        <div className="w-1/4 border-r-2 p-2">
          <h2 className="flex items-center mb-2">
            <VscStarEmpty className="mr-2" size={20} />
            Total Orders
          </h2>
          <div className="flex justify-between items-start ">
            <p className="px-2 text-3xl font-bold mb-4">1252</p>
            <LineChart width={70} height={50} data={data}>
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#2196F3"
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </div>
          <p className="text-sm px-2">0.9% {"  "} +0.4k this week</p>
        </div>
        <div className="w-1/4 p-2">
          <h2 className="flex items-center mb-2">
            <RiArrowGoBackFill className="mr-2" size={15} />
            Refunded
          </h2>
          <div className="flex justify-between items-start ">
            <p className="px-2 text-3xl font-bold mb-4">221</p>
            <LineChart width={70} height={50} data={data}>
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#F44236"
                dot={false}
                strokeWidth={3}
              />
            </LineChart>
          </div>
          <p className="text-sm px-2">1.5% {"  "} -33 this week</p>
        </div>
      </section>
      <section className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-2 font-semibold">Revenue vs Orders</h2>
          <LineChart width={600} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="revenue" stroke="#2196F3" />
            <Line type="monotone" dataKey="orders" stroke="#F44236" />
          </LineChart>
        </div>
        <div>
          <h2 className="mb-2 font-semibold">Sales By Category</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={data0}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </section>
      <section className="w-2/3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Top Products</h2>
          <div className="flex">
            <div className="relative px-4">
              <input
                type="text"
                placeholder="Search products..."
                className="py-2 px-3 pr-10 text-gray-700 w-full focus:outline-none bg-stone-100 border border-gray-300 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-indigo-300"
              />
              <IoSearchOutline
                className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
            <select className="border-2 p-2 rounded-md bg-stone-100">
              <option>this week</option>
              <option>this month</option>
              <option>this year</option>
            </select>
          </div>
        </div>
        <div className="text-gray-400 flex justify-around mb-2">
          <span>Product name</span>
          <span>Product ID</span>
          <span>Price</span>
          <span>Sold</span>
          <span>Sales</span>
        </div>
        <div className="flex justify-around">
          <span className="font-semibold">Macbook Air</span>
          <span>22453388dd8</span>
          <span>$1200</span>
          <span>9971</span>
          <span className="font-semibold">$20k</span>
        </div>
      </section>
    </div>
  );
}

export default Overview;
