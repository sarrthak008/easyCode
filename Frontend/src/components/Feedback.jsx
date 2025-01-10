import React from "react";
import Masonry from "react-masonry-css";

const Feedback = ({ items }) => {
    console.log(items)
  const breakpointColumns = {
    default: 4, // 4 columns for large screens
    1024: 3,    // 3 columns for medium screens
    768: 2,     // 2 columns for small screens
    640: 2,     // 1 column for very small screens
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex gap-4"
      columnClassName="flex flex-col gap-4"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-gray-900 p-4  rounded-lg shadow-md shadow-blue-400 border-b-2 border-b-green-400"
        >
         <div className="flex gap-2 items-center">
          <div className="h-[30px] w-[30px] bg-gray-400 rounded-full">
             <img src={item.profile} className="h-full w-full object-cover"/>
          </div>
          <h2 className="text-lg font-medium mb-2 text-gray-100">{item.name.split(" ")[0]}</h2>
         </div>
          <div>
        <span><i className="ri-double-quotes-l text-green font-bold "></i></span>
           <p className="text-gray-400">{item.description}</p>
         <span className="flex block float-end"><i className="ri-double-quotes-r text-green font-bold  mr-5"></i></span>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default Feedback;
