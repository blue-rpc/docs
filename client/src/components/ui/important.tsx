import React from "react";

const Important = ({ text }: { text: string }) => {
  return (
    <div className=" relative rounded-xl bg-red-900 p-4 max-w-[50%] overflow-hidden">
      <div className=" p-2 rounded-br-xl text-red-500  bg-red-800 absolute top-0 left-0">
        <p>Important</p>
      </div>
      <p className="text-stone-100 text-xl mt-8">{text}</p>
    </div>
  );
};

export default Important;
