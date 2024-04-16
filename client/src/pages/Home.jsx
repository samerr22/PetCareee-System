import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import dog from "../img/dog.png";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [form, setform] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [FeedId, setFeedId] = useState("");
  const currentuserId = currentUser ? currentUser._id : null;
  const [formId, setformId] = useState("");
  const [blogId, setblogId] = useState("");
  console.log("arra", form);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");
  const [health, sethealth] = useState([]);
  console.log(health);

  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/item/Itemget`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setform(data.item);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, []);

  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/health/Health`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          sethealth(data.health);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchform();
  }, []);

  //report
  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    // Add house details to PDF
    doc.setFontSize(16);
    doc.text(20, yPos, "items Details:");
    yPos += 10;

    form.forEach((formm) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `ItemName: ${formm.Iname}`);
      doc.text(20, yPos + 5, `price: ${formm.price}`);
      doc.text(20, yPos + 10, `phone: ${formm.phone}`);
      doc.text(20, yPos + 15, `comment: ${formm.desc}`);

      yPos += 30;
    });

    // Save the PDF
    doc.save("items_pet.pdf");
  };

  //delete items
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/item/Idelete/${formId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setform((prev) => prev.filter((formm) => formm._id !== formId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...form]);
    } else {
      // If there's a query, filter the data
      const filteredData = form.filter(
        (formm) =>
          formm.name && formm.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, form]);

  //delete blog
  const handleDeleteblog = async () => {
    try {
      const res = await fetch(`/api/health/health/${blogId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setform((prev) => prev.filter((formm) => formm._id !== blogId));
        alert("suceessfull");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div>
          <img src={dog} alt="" className="h-[500px] w-[1400px] mt-4" />
        </div>
      </div>

      <div className="ml-8 mt-7 flex justify-center items-center">
        <form>
          <input
            type="text"
            placeholder="Search... "
            className=" w-[300px] h-8 rounded-lg shadow-xl"
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="flex justify-center items-center mt-5">
        <h1 className="text-xl font-serif">Product Details</h1>
      </div>

      <div>
        <div className="flex justify-center items-center mt-4">
          {currentUser?.isinvntryManager && (
            <>
              <div className="flex justify-center items-center gap-4 ml-4">
                <button
                  className="hidden sm:inline  hover:underline bg-red-700 hover:bg-red-500  text-white font-serif py-2 px-4  rounded-full"
                  type="button"
                  onClick={() => generatePDF()}
                >
                  Generate Report
                </button>

                <div>
                  <Link to={`/create-item`}>
                    <div className="hidden sm:inline  bg-red-700 hover:bg-red-500  text-white font-serif   py-2 px-4 rounded-full cursor-pointer">
                      Add items
                    </div>
                  </Link>
                </div>

                <div>
                  <Link to={`/order`}>
                    <div className="hidden sm:inline  bg-red-700 hover:bg-red-500  text-white font-serif   py-2 px-4 rounded-full cursor-pointer">
                      New Order
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {filter && filter.length > 0 ? (
              <>
                {filter.slice(0, showMore ? filter.length : 4).map((formm) => (
                  <div
                    key={formm._id}
                    className="w-[300px] h-[400px]  mt-10 mb-40 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">
                      <div className="flex justify-center items-center ">
                        <img
                          className="w-[100px] h-[100px] mt-3 rounded-lg"
                          src={formm.image}
                        />
                      </div>

                      <div className="border border-black h-56 mt-8 rounded-lg ">
                        <div className="flex gap-4 ml-2">
                          <div className="font-extralight text-lg">Name:</div>

                          <div className="font-bold text-xl mb-2 max-w-[200px] break-words">
                            {formm.Iname}
                          </div>
                        </div>

                        <div className="flex gap-4 ml-2">
                          <div className="font-extralight text-lg">
                            Price: Rs.
                          </div>

                          <div className="text-gray-700 text-lg">
                            {formm.price}
                          </div>
                        </div>

                        <div className="flex gap-4 ml-2">
                          <div className="font-extralight text-lg">Phone: </div>
                          <div className="text-gray-700  text-lg max-w-[200px] break-words">
                            {formm.phone}
                          </div>
                        </div>
                        <div className=" ml-3">
                          <div className="font-extralight text-lg">
                            Descripton:
                          </div>

                          <div className="text-gray-700 text-sm mt-1 font-extralight  max-w-[400px] break-words">
                            {formm.desc}
                          </div>
                        </div>
                      </div>

                      {currentUser?.isinvntryManager && (
                        <>
                          <div className="flex justify-center items-center gap-6 mt-8">
                            <Link
                              to={`/update-item/${formm._id}`}
                              className="hidden sm:inline   bg-red-700 hover:bg-red-500  text-white font-serif  py-2 px-4  rounded-full cursor-pointer"
                            >
                              Edit
                            </Link>
                            
                            <div>
                              <span
                                onClick={() => {
                                  setformId(formm._id);
                                  handleDelete();
                                }}
                                className="hidden sm:inline    bg-red-700 hover:bg-red-500  text-white font-serif py-2 px-4  rounded-full cursor-pointer"
                              >
                                Delete
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {!showMore && form.length > 4 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center mt-2">
          <h1 className="text-xl font-serif">Health Quotes</h1>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {health && health.length > 0 ? (
              <>
                {health.slice(0, showMore ? health.length : 2).map((fomm) => (
                  <div
                    key={fomm._id}
                    className="w-[600px] h-[400px]  mt-10 mb-40 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">
                      <div className="border border-black h-56 mt-8 rounded-lg ">
                        <div className="flex gap-4 ml-2">
                          <div className="font-extralight text-lg">
                            pet Type:
                          </div>

                          <div className="font-bold text-xl mb-2 max-w-[200px] break-words">
                            {fomm.type}
                          </div>
                        </div>

                        <div className="flex gap-4 ml-2">
                          <div className="font-extralight text-lg">Varity</div>

                          <div className="text-gray-700 text-lg">
                            {fomm.name}
                          </div>
                        </div>

                        <div className=" ml-3">
                          <div className="font-extralight text-lg">
                            Descripton:
                          </div>

                          <div className="text-gray-700 text-sm mt-1 font-extralight  max-w-[500px] break-words">
                            {fomm.desc}
                          </div>
                        </div>
                      </div>

                      {currentUser?.isDoctor && (
                        <>
                          <div className="flex justify-center items-center gap-6 mt-8">
                            <Link
                              to={`/updatehealth/${fomm._id}`}
                              className="hidden sm:inline   bg-red-700 hover:bg-red-500  text-white font-serif  py-2 px-4  rounded-full cursor-pointer"
                            >
                              Edit
                            </Link>
                            <div>
                              <span
                                onClick={() => {
                                  setblogId(fomm._id);
                                  handleDeleteblog();
                                }}
                                className="hidden sm:inline    bg-red-700 hover:bg-red-500  text-white font-serif py-2 px-4  rounded-full cursor-pointer"
                              >
                                Delete
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {!showMore && health.length > 2 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>You have no items yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
