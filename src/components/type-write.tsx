import React from "react";

interface TypeWriterProps {
  text: string;
}

const TypeWriter: React.FC<TypeWriterProps> = ({ text }) => {
  return (
    <div className="w-fit flex  items-center my-10">
      <h1 className="animate- overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 text-5xl text-white font-bold">
        {text}
      </h1>
    </div>
  );
};

export default TypeWriter;
