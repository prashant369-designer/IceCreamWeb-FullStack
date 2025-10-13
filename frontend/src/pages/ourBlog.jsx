import React, { useEffect, useState } from "react";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer2";
import Marquee from "react-fast-marquee";
import ContactBg from "../images/contactbgimage.jpg";
import Image1 from "../images/deliveryicon.png";
import Image2 from "../images/scoopice.png";
import Image3 from "../images/homeicon.png";
import Slideimage from "../images/sideimage.svg";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const items = [
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
    { type: "text", content: "🍨 Free shipping on orders above $50" },
    { type: "text", content: "Subscribe and get 20% off + FREE shipping 🍨" },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/blog/")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <>
     {/* marquee  */}
      <div className="bg-red-600">
        <Marquee speed={50} gradient={false}>
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
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl text-white text-center"style={{fontFamily: "LoveYou1"}}>
          Our Blogs
        </h1>
      </div>
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex flex-col group bg-white shadow-sm hover:shadow-xl rounded-lg overflow-hidden transition duration-300"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide font-medium">
                {blog.badge[0]}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 7.5l-3 3m0 0l-3-3m3 3V3.75m0 6.75v6.75"
                    />
                  </svg>
                </div>
                <p>
                  By{" "}
                  <span className="text-red-500 font-semibold">
                    {blog.createdBy}
                  </span>{" "}
                  • {new Date(blog.timestamp).toLocaleDateString()}
                </p>
              </div>

              <h2 className="text-xl font-bold text-gray-900 group-hover:text-red-500 mb-3 leading-snug">
                {blog.title}
              </h2>

              <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                {blog.description}
              </p>

              <a
                href="#"
                className="text-red-500 font-semibold flex items-center mt-auto hover:underline"
              >
                → Read More
              </a>
            </div>
          </div>
        ))}
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
    <Footer/>
    </>

  );
};

export default BlogSection;
