import Image from "next/image";
import React from "react";

const Custom404 = () => {
  return (
    <div className="h-[calc(100vh-0rem)] w-full bg-light flex flex-col gap-0 justify-center items-center">
        <Image className="animate-float w-[15rem] sm:w-[25rem] h-auto" src={"/404 Error-pana.svg"} width={300} height={300} alt="error"/>
      <div className="text-base">This page could not be found</div>
    </div>
  );
};

export default Custom404;
