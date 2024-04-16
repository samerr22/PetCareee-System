import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSilce";

export default function () {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-black  ">
      <div className=" flex justify-between items-center mr-10 max-w-6xl mx-auto p-3">
        <ul className="flex justify-center items-center gap-16 ml-32">
          <Link to="/">
            <li className="text-white font-serif">Home</li>
          </Link>

          <Link to="/">
            <li className="text-white font-serif">About Us</li>
          </Link>
          <Link to="/">
            <li className="text-white font-serif">Profile</li>
          </Link>

          {currentUser && (
            <li
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white"
            >
              click here
            </li>
          )}
          {isMenuOpen && (
            <div
              className=" absolute ml-[300px]  mt-52 bg-white border border-gray-200 rounded w-32 shadow-md"
              ref={menuRef}
            >
              {currentUser.isDoctor && (
                <>
                  <div className="flex justify-center items-center">
                    <h1>Hy Docter</h1>
                  </div>
                  <div>
                    <Link to="/view">
                      <li className="text-black font-serif hover:bg-black hover:bg-opacity-40 hover:text-white w-32 ">
                        Appoiment
                      </li>
                    </Link>
                    <Link to="/cancel">
                      <li className="text-black font-serif hover:bg-black hover:bg-opacity-40 hover:text-white w-32 ">
                        cancel Appoiment
                      </li>
                    </Link>
                  </div>
                </>
              )}
              {currentUser.isinvntryManager && (
                <>
                  <div className="flex justify-center items-center">
                    <h1>Hy seller</h1>
                  </div>
                  <div>
                    <Link to="/create-item">
                      <li className="text-black font-serif hover:bg-black hover:bg-opacity-40 hover:text-white w-32 ">
                        Add Items
                      </li>
                    </Link>
                    <Link to="/">
                      <li className="text-black font-serif hover:bg-black hover:bg-opacity-40 hover:text-white w-32 ">
                        Manage Items
                      </li>
                    </Link>
                  </div>
                </>
              )}

              {currentUser && (
                <>
                  <div className="flex justify-center items-center">
                    <h1>Hy pet owner</h1>
                  </div>
                  <div>
                    <Link to="/Appoiment">
                      <li className="text-black font-serif hover:bg-black hover:bg-opacity-40 hover:text-white w-32 ">
                        Add Appoiment
                      </li>
                    </Link>
                    <Link to="/allapoiment">
                      <li className="text-black font-serif hover:bg-black hover:bg-opacity-40 hover:text-white w-32 ">
                        Appoiment
                      </li>
                    </Link>
                    <Link to="/paydetails">
                      <li className="text-black font-serif hover:bg-black hover:bg-opacity-40 hover:text-white w-32 ">
                        Manage Payment
                      </li>
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}

          {currentUser ? (
            <span onClick={handleSignout} className="cursor-pointer text-white">
              Sign Out
            </span>
          ) : (
            <Link to="/sign-in">
              <li className="text-white">Sing In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
