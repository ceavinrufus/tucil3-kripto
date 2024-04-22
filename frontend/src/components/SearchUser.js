import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

const SearchUser = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Clear the existing timeout
    let timeoutId = null;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      axios
        .get(
          (process.env.NODE_ENV === "development"
            ? "http://localhost:4000"
            : process.env.REACT_APP_API_URL) + `/get-user/?username=${search}`
        )
        .then((res) => {
          // console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }, 1000);

    // Clean up by clearing the timeout when the component unmounts or when search changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [search]);

  return (
    <div className="flex-1 divide-y-2 min-w-[200px]">
      <div className="flex mb-2 font-bold">
        <h1 className="mx-auto md:mx-0 hover:cursor-pointer md:hover:cursor-default">
          SEARCH USER
        </h1>
      </div>
      <div className="space-y-2">
        <div className="my-2 transition overflow-hidden">
          <SearchBar setSearch={setSearch} />
          <div
            className={`${
              !search && "invisible"
            } mt-1 bg-[#fff] text-[#44288F] px-2 py-1 border border-[#F58F00]`}
          >
            {!loading ? (
              user ? (
                <Link
                  to={"/profile/" + user?.username}
                  className="gap-2 flex items-center"
                >
                  <CgProfile size={30} color={"#000"} />@{user?.username}
                </Link>
              ) : (
                <>No users found</>
              )
            ) : (
              <>...</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
