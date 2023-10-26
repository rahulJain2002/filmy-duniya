import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesRef } from "../firebase/Firebase";
import swal from "sweetalert";
import { AppState } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const useAppState = useContext(AppState);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    year: "",
    url: "",
    description: "",

    rating: 0,
    userRated: 0,
  });

  const [loading, setLoading] = useState(false);

  const add = async () => {
    setLoading(true);
    try {
      if (useAppState.login) {
        await addDoc(moviesRef, form);

        swal({
          title: "Successfully Added",
          icon: "success",
          button: false,
          timer: 3000,
        });

        setLoading(false);
        form.title = "";
        form.year = "";
        form.url = "";
        form.description = "";
      } else {
        window.alert("Please Login First");
        navigate("/login");
      }
    } catch (err) {
      swal({
        title: err,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    add();
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
              Add Movie
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="title"
                      className="leading-7 text-sm text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="year"
                      className="leading-7 text-sm text-white"
                    >
                      Year
                    </label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      className="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={form.year}
                      onChange={(e) =>
                        setForm({ ...form, year: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="url"
                      className="leading-7 text-sm text-white"
                    >
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="url"
                      name="url"
                      className="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      value={form.url}
                      onChange={(e) =>
                        setForm({ ...form, url: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="leading-7 text-sm text-white"
                    >
                      Description
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full bg-gray-100  rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition-all duration-500"
                  >
                    {loading ? (
                      <TailSpin height={30} width={30} color="white" />
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>

                <div className="p-2 w-full pt-8 mt-8 border-t border-gray-100 opacity-25 text-center">
                  {" "}
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
