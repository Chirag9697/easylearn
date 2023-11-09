import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Nav() {
  const [opennav, setOpennav] = useState(false);
  const handleopennav = () => {
    if (opennav == true) {
      setOpennav(false);
    } else {
      setOpennav(true);
    }
  };
  return (
    <>
      <div
        className="flex bg-amber-300 w-full h-16 justify-between"
        style={{ fontFamily: "roboto" }}
      >
        <div className="flex w-64 h-full justify-center items-center font-bold text-3xl hover:cursor-pointer">
          <img
            width="100"
            height="100"
            src="https://img.icons8.com/carbon-copy/100/saving-book.png"
            alt="saving-book"
          />
          <p>EASYLEARN</p>
        </div>

        <div
          className="flex items-center h-full hover:cursor-pointer md:hidden"
          onClick={() => handleopennav()}
        >
          <img
            width="30"
            height="30"
            src="https://img.icons8.com/ios-glyphs/30/activity-feed-2.png"
            alt="activity-feed-2"
          />
        </div>
        {
          !localStorage.getItem("token") &&
          <div className={`hidden md:flex justify-between w-48 mr-4`}>
          <Link to="login">
            <p className="flex items-center p-5 font-semibold hover:cursor-pointer hover:bg-amber-400 hover:transition-shadow transition ease-in duration-150">
              LOGIN
            </p>
          </Link>
          <Link to="/register">
            <p className="flex items-center p-5 font-semibold hover:cursor-pointer hover:bg-amber-400 transition ease-in duration-150">
              REGISTER
            </p>
          </Link>
        </div>
        }
      </div>
      <div
        className={`${
          opennav == true ? "flex flex-col transition-opacity" : "hidden"
        } md:hidden`}
        style={{ opacity: opennav === true ? 1 : 0 }}
      >
        {
          !localStorage.getItem("token") &&
          <Link to="/login">
          <p className="flex items-center bg-amber-300  justify-center p-5 w-full font-semibold hover:cursor-pointer hover:bg-amber-400 transition ease-in duration-150">
            LOGIN
          </p>
        </Link>
        }
        {
          !localStorage.getItem("token") && 
          <Link to="/register">
        
          <p className="flex items-center bg-amber-300  justify-center p-5 w-full font-semibold hover:cursor-pointer hover:bg-amber-400">
            REGISTER
          </p>
        </Link>
        }
      </div>
    </>
  );
}
