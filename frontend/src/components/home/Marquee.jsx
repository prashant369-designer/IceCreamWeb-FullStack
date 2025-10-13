import React from 'react';
import Marquee from 'react-fast-marquee';
import Asterisk from "../../images/asterisk.svg"

const MarqueeComponent = () => {
  const items = [
    { type: 'text', content: 'do-good' },
    {type: 'image', content: Asterisk},
    { type: 'text', content: 'taste-good' },
    {type: 'image', content: Asterisk},
    { type: 'text', content: 'feel-good' },
    {type: 'image', content: Asterisk},
    { type: 'text', content: 'ice-cream' },
  ];

  return (
    <>
      <div className="pt-[50px]">
        <Marquee speed={100} gradient={false}>
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
            
                <span className="px-5 text-[96px] font-semibold text-red-500 uppercase ">
                  {item.type === 'image' && <img src={item.content} alt="Asterisk" />}
                  {item.type === 'text' && item.content}
                </span>
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
};

export default MarqueeComponent;