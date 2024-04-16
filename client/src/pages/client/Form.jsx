import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pets from "./pets.jpg";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Formadd = {
        currentuserId: currentUser._id,
        ...formData,
      };

      setErrorMessage(null);

      const res = await fetch("/api/from/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Formadd),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
     
      if (res.ok) {
        navigate("/allapoiment");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen  mt-36 mb-10">
      <div className="flex justify-center items-center gap-2">
        <div className="hidden lg:block">
          <img className="w-[600px] h-[500px] ml-10  mt-6" src={Pets} alt="" />
        </div>

        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1">
            <h className="text-3xl text-gray-800 font-serif ">Fill the Form</h>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Owner</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Name"
                  id="name"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Address</h3>

                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Address"
                  id="Address"
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Phone</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Phone"
                  id="Phone"
                  onChange={handlchange}
                />
              </div>

              <select
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11 "
                id="type"
                onChange={handlchange}
              >
                <option value="">Select </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="other">Other</option>
              </select>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">PetName</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="Petname"
                  id="petname"
                  onChange={handlchange}
                />
              </div>

              <button
                className=" bg-red-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                type="submit"
              >
                Submit
              </button>
            </form>

            {errorMessage && (
              <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
                {errorMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
