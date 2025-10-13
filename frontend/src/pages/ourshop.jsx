import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Heart, Eye, ShoppingCart } from "lucide-react";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer2";
import Marquee from "react-fast-marquee";
import ContactBg from "../images/contactbgimage.jpg";
import Image1 from "../images/deliveryicon.png";
import Image2 from "../images/scoopice.png";
import Image3 from "../images/homeicon.png";
import Slideimage from "../images/sideimage.svg";

const PremiumProducts = () => {
  const [products, setProducts] = useState([]);
  const items = [
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/premium/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <>
      {/* marquee  */}
      <div className="bg-red-600">
        <Marquee speed={100} gradient={false}>
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="px-5 text-lg text-white">{item.content}</span>
            </div>
          ))}
        </Marquee>
      </div>

      <hr className="border-[var(--primary)] opacity-100 m-0" />
      <Navbar />
      {/* image section  */}
      <div className="relative">
        <img
          src={ContactBg}
          alt="Contact Background"
          className="w-full h-[360px] object-cover brightness-50"
        />
        <h1
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white text-center"
          style={{ fontFamily: "LoveYou1" }}
        >
          Our Shop
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8 px-6 py-10">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-3 border-b pb-2">
            Product Categories
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>Frozen Yogurt</li>
            <li>Fruit Bars</li>
            <li>Keto Ice Cream</li>
            <li>Rolled Ice Cream</li>
            <li>Vegan Ice Pops</li>
          </ul>

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3 border-b pb-2">
              Filter By Price
            </h2>
            <div>
              <input
                type="range"
                min="0"
                max="500"
                className="w-full accent-red-500 cursor-pointer"
              />
              <p className="text-sm text-gray-600 mt-2">Price: $0 – $500</p>
              <button className="cursor-pointer mt-3 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600">
                Filter
              </button>
            </div>
          </div>
        </aside>

        {/* Product Section */}
        <section className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-5">
            <p className="text-gray-600">
              Showing 1–{products.length} of {products.length} results
            </p>
            <div className="flex items-center gap-3">
              <select className="border rounded-md p-2 text-sm text-gray-700">
                <option>Default sorting</option>
                <option>Sort by price</option>
                <option>Sort by rating</option>
              </select>
              <select className="border rounded-md p-2 text-sm text-gray-700">
                <option>Show 12</option>
                <option>Show 24</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col"
              >
                <div className="relative flex justify-center bg-blue-100 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.round(product.rating)
                              ? "fill-yellow-400"
                              : "fill-gray-200"
                          }`}
                        />
                      ))}
                      <span className="text-gray-600 text-xs ml-1">
                        ({product.rating})
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {product.content}
                    </p>
                    <p className="mt-2 text-lg font-bold text-gray-900">
                      ${product.price}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition">
                      <ShoppingCart size={16} /> Add To Cart
                    </button>
                    <button className="cursor-pointer border p-2 rounded-full hover:bg-gray-100">
                      <Heart size={18} />
                    </button>
                    <button className="cursor-pointer border p-2 rounded-full hover:bg-gray-100">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* need lebagol section  */}
      <div className=" border-t-2 border-red-600 mb-20"></div>
      <div className="flex container justify-between hidden lg:flex ">
        <div className="w-1/4 ml-20 mt-10">
          {" "}
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center lg:text-left">
            Need Lebagol Now?
          </h2>
        </div>
        <div className="flex  gap-20">
          <div className="flex flex-col items-center text-center">
            <img src={Image1} alt="Local Delivery" className="w-14 h-14 mb-3" />
            <p className="text-sm font-semibold tracking-wide">
              LOCAL DELIVERY
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
            {" "}
            <img src={Slideimage} alt="" />
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={Image2} alt="Local Delivery" className="w-14 h-14 mb-3" />
            <p className="text-sm font-semibold tracking-wide">SCOOP SHOPS</p>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
            {" "}
            <img src={Slideimage} alt="" />
          </div>
          <div className="flex flex-col items-center text-center">
            <img src={Image3} alt="Local Delivery" className="w-14 h-14 mb-3" />
            <p className="text-sm font-semibold tracking-wide">
              GROCERY LOCATOR
            </p>
          </div>
        </div>
      </div>
      {/* need lebagol section for mobile device  */}
      <div className="grid grid-cols-1 container justify-between md:hidden space-y-8 mb-10">
        <div>
          {" "}
          <h2 className="text-3xl md:text-3xl font-semibold text-center lg:text-left">
            Need Lebagol Now?
          </h2>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={Image1} alt="Local Delivery" className="w-14 h-14 mb-3" />
          <p className="text-sm font-semibold tracking-wide">LOCAL DELIVERY</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={Image2} alt="Local Delivery" className="w-14 h-14 mb-3" />
          <p className="text-sm font-semibold tracking-wide">SCOOP SHOPS</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={Image3} alt="Local Delivery" className="w-14 h-14 mb-3" />
          <p className="text-sm font-semibold tracking-wide">GROCERY LOCATOR</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PremiumProducts;
