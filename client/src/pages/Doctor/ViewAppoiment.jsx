import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [Form, setform] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const currentuserId = currentUser ? currentUser._id : null;
  console.log("arra", Form);
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState(" ");

  useEffect(() => {
    const fetchform = async () => {
      try {
        const res = await fetch(`/api/from/getAllpets`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setform(data.form);
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
    doc.text(20, yPos, "Appoiment Details:");
    yPos += 10;

    Form.forEach((formm) => {
      doc.setFontSize(12);
      doc.text(20, yPos, `Name: ${formm.name}`);
      doc.text(20, yPos + 5, `Adrress: ${formm.Address}`);
      doc.text(20, yPos + 10, `Phone: ${formm.Phone}`);
      doc.text(20, yPos + 15, `Type: ${formm.type}`);
      doc.text(20, yPos + 20, `PetName: ${formm.petname}`);

      yPos += 35;
    });

    // Save the PDF
    doc.save("petcare_appoiment.pdf");
  };

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...Form]);
    } else {
      // If there's a query, filter the data
      const filteredData = Form.filter(
        (formm) =>
          formm.name && formm.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, Form]);

  return (
    <div>
      <div className="flex justify-center items-center text-3xl font-serif mt-4 text-slate-900">
        <h1>Today Appiments</h1>
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
      <div>
        <div className="flex justify-center items-center mt-6 gap-5 ml-8">
          {currentUser.isDoctor && (
            <>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="hidden sm:inline  bg-red-700 hover:bg-red-500  text-white font-serif py-2 px-4  rounded-full"
                  type="button"
                  onClick={() => generatePDF()}
                >
                  Generate Report
                </button>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Link to={"/cancel"}>
                  <button
                    className="hidden sm:inline   bg-red-700 hover:bg-red-500  text-white font-serif py-2 px-4  rounded-full"
                    type="button"
                  >
                    cancel apoiments
                  </button>
                </Link>
              </div>

              <div className="flex justify-center items-center gap-2">
                <Link to={"/healthblog"}>
                  <button
                    className="hidden sm:inline   bg-red-700 hover:bg-red-500  text-white font-serif py-2 px-4  rounded-full"
                    type="button"
                  >
                    Add blog
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {filter && filter.length > 0 ? (
              <>
                {filter.slice(0, showMore ? filter.length : 2).map((formm) => (
                  <div
                    key={formm._id}
                    className="w-[600px] h-[300px]  mt-10 mb-40 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">
                      <div className="flex gap-4">
                        <div className="font-extralight text-xl">Name:</div>

                        <div className="font-bold text-xl mb-2 max-w-[100px] break-words">
                          {formm.name}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="font-extralight text-xl">Address:</div>
                        <div className="text-gray-700 text-xl ">
                          {formm.Address}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="font-extralight text-xl">Phone:</div>

                        <div className="text-gray-700  text-xl max-w-[200px] break-words">
                          {formm.Phone}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="font-extralight text-xl">Type:</div>
                        <div className="text-gray-700 text-xl max-w-[200px] break-words">
                          {formm.type}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="font-extralight text-xl">PetName:</div>

                        <div className="text-gray-700 text-xl  max-w-[200px] break-words">
                          {formm.petname}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {!showMore && Form.length > 2 && (
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
