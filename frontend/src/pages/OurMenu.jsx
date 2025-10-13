import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer2";
import Marquee from "react-fast-marquee";
import ContactBg from "../images/contactbgimage.jpg";
import Image1 from "../images/deliveryicon.png";
import Image2 from "../images/scoopice.png";
import Image3 from "../images/homeicon.png";
import Slideimage from "../images/sideimage.svg";

function OurMenu() {
  const items = [
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
  ];

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => setMenu(res.data))
      .catch((err) => console.error("Error fetching menu:", err));
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
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white text-center"style={{fontFamily: "LoveYou1"}}>
          Our Menu
        </h1>
        
      </div>
      {/* ice sections */}
      <section className="max-w-7xl mx-auto py-10 px-4 mt-14">
        {menu.map((section) => (
          <div key={section._id} className="mb-12">
            <h2 className="text-red-500 border border-red-600 w-fit  font-bold text-xl p-2 bg-red-500 text-white mb-2 uppercase tracking-wider">
              {section.main_heading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.category.map((item) => (
                <div
                  key={item._id}
                  className="bg-white  rounded-2xl p-6 flex flex-col gap-4 transition"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <span className="text-red-500 font-semibold">
                      ₹{item.price}
                    </span>
                  </div>

                  <p className="text-gray-500 text-lg">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
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
                    <img
                      src={Image1}
                      alt="Local Delivery"
                      className="w-14 h-14 mb-3"
                    />
                    <p className="text-sm font-semibold tracking-wide">
                      LOCAL DELIVERY
                    </p>
                  </div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
                  {" "}
                  <img src={Slideimage} alt="" />
                </div>
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={Image2}
                      alt="Local Delivery"
                      className="w-14 h-14 mb-3"
                    />
                    <p className="text-sm font-semibold tracking-wide">SCOOP SHOPS</p>
                  </div>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
                  {" "}
                  <img src={Slideimage} alt="" />
                </div>
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={Image3}
                      alt="Local Delivery"
                      className="w-14 h-14 mb-3"
                    />
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
                <h2  className="text-3xl md:text-3xl font-semibold text-center lg:text-left">
                  Need Lebagol Now?
                </h2>
              </div>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={Image1}
                    alt="Local Delivery"
                    className="w-14 h-14 mb-3"
                  />
                  <p className="text-sm font-semibold tracking-wide">
                    LOCAL DELIVERY
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={Image2}
                    alt="Local Delivery"
                    className="w-14 h-14 mb-3"
                  />
                  <p className="text-sm font-semibold tracking-wide">SCOOP SHOPS</p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <img
                    src={Image3}
                    alt="Local Delivery"
                    className="w-14 h-14 mb-3"
                  />
                  <p className="text-sm font-semibold tracking-wide">
                    GROCERY LOCATOR
                  </p>
                </div>
            </div>
      <Footer />
    </>
  );
}

export default OurMenu;
