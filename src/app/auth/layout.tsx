import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-x-3">
      <div className="hidden 2xl:flex w-2/4 min-h-screen">
        <div className="relative w-full overflow-hidden">
          <Image
            src={"/wall.jpg"}
            alt="wallpaper"
            width={300}
            height={300}
            className="absolute w-[100%]"
          />
          <div className="absolute top-8 left-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-gray-700 rounded"></div>
            </div>
            <span className="text-white text-xl font-semibold">Zenflow</span>
          </div>
          <div className="absolute bottom-8 left-8 max-w-md">
            <blockquote className="text-white text-2xl font-medium leading-tight mb-4">
              "Zenflow transformed our workflow and boosted productivity by
              40%."
            </blockquote>
            <div className="text-white">
              <div className="font-semibold">Sarah Chen</div>
              <div className="text-white/80">
                Head of Operations, TechFlow Solutions
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="2xl:w-2/4 2xl:pt-2 pt-28 w-full 2xl:flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
