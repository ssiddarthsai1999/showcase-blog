import React from 'react'
import "../../../typography.css"
import newyork from "../../../Assets/staticassets/newyork.jpg"
import { Link } from 'react-router-dom';

function HeroC() {
  return (
      <div className="flex  mx-auto align-middle justify-evenly  flex-col md:flex-row  w-full items-center">
          <div className=" p-24">
              <h1 className="mb-4"> Welcome to ITravelEverywhere</h1>
              <p className="mb-10">
                  Explore the World with Us - Your Passport to Unforgettable
                  Adventures!{" "}
              </p>
              <Link to="/destinations">
                  <button className="button1 ">Explore all</button>
              </Link>
          </div>
          <div className="   flex justify-center ">
              <img
                  src={newyork}
                  alt="newyork"
                  className=" rounded-[24px] w-[70%] h-[70&]"
              />
          </div>
      </div>
  );
}

export default HeroC