import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer2";
import Marquee from "react-fast-marquee";
import ContactBg from "../images/contactbgimage.jpg";
import Image1 from "../images/deliveryicon.png";
import Image2 from "../images/scoopice.png";
import Image3 from "../images/homeicon.png";
import Slideimage from "../images/sideimage.svg";

const ClientReviews = () => {
  const [clients, setClients] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
   const items = [
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/clientview")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
  };

  return (
    <>
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
    <Navbar/>
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
              Our Story
            </h1>
          </div>
  <section className="grid grid-cols-1 md:grid-cols-3">
      {/* Left Image */}
      <div className="h-[500px]">
        <img
          src="https://demo2.wpopal.com/lebagol/wp-content/uploads/2024/03/story_img1.jpg"
          alt="Popsicles"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Middle Content */}
      <div className="bg-pink-100 flex flex-col justify-center px-8 py-12 text-center md:text-left">
        <p className="text-red-500 uppercase tracking-widest text-sm font-semibold">
          Our History
        </p>
        <h2 className="text-6xl font-bold mt-2 leading-snug" style={{fontFamily: "LoveYou"}}>
          Lebagol Since 1990
        </h2>
        <p className="text-gray-600 text-lg mt-4 leading-relaxed">
          Lebagol’s is a certified B Corp, as we believe in business as a force
          for good. We create both super indulgent and healthier products whilst
          treading as lightly as we can on our planet, and have reduced our
          carbon intensity by 21% since 2020.
        </p>
      </div>

      {/* Right Image */}
      <div className="h-[500px]">
        <img
          src="https://demo2.wpopal.com/lebagol/wp-content/uploads/2024/03/story_img2.jpg"
          alt="Popsicles with strawberries"
          className="object-cover w-full h-full"
        />
      </div>
    </section>

    <section className="py-16 px-6 text-center">
      <div className="mb-10">
        <div className="text-4xl font-bold text-gray-800 relative inline-block">
          <span className="text-red-500 text-7xl absolute -top-8 left-1/2 -translate-x-1/2">❝</span>
          <h2 className="mt-6 text-5xl">Happy Clients Say</h2>
        </div>
      </div>

      {clients.length > 0 && (
        <div className="relative flex justify-center items-center gap-6">
          <button
            onClick={prevSlide}
            className="cursor-pointer bg-white rounded-full shadow-md hover:shadow-lg p-3 absolute left-0 sm:left-10"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {clients
              .slice(currentIndex, currentIndex + 3)
              .map((client) => (
                <div
                  key={client._id}
                  className="bg-white shadow-md rounded-2xl p-6 text-left hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={client.image}
                      alt={client.heading}
                      className="w-18 h-18 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{client.heading}</h3>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${
                              i < Math.round(client.rating) ? "text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic text-lg">“{client.message}”</p>
                </div>
              ))}
          </div>

          <button
            onClick={nextSlide}
            className="cursor-pointer bg-white rounded-full shadow-md hover:shadow-lg p-3 absolute right-0 sm:right-10"
          >
            <FaArrowRight className="text-gray-600" />
          </button>
        </div>
      )}

      <div className="mt-10 flex justify-center items-center gap-2">
        <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
          <FaStar /> <span>4.8/5</span>
        </div>
        <p className="text-gray-500 text-sm">
          Trusted by <span className="font-semibold">199,087 Clients</span>
        </p>
      </div>
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
    <Footer/>
    </>
  );
};

export default ClientReviews;
