import React, { useState } from "react";
import { ROLE } from "../common/role";
import { IoIosClose } from "react-icons/io";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
export default function Changerole({ name, email, role, onClose, _id }) {
  const [userrole, setUserrole] = useState(role);
  const handleChange = (e) => {
    setUserrole(e.target.value);
  };
  const changeUserrole = async () => {
    const fetchData = await fetch(SummaryApi.update_user.url, {
      method: SummaryApi.update_user.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        role: userrole,
        _id,
        name,
        email,
      }),
    });
    const dataApi = await fetchData.json();
    console.log("DATA API", dataApi);
    if (dataApi.success) {
      onClose();
      toast.success("User updated successfully");
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center">
      <div className=" mx-auto bg-white shadow-md p-4 w-full max-w-sm ">
        <button className=" block ml-auto  text-4xl" onClick={onClose}>
          <IoIosClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>

        <div className=" flex items-center justify-between my-4">
          <p>Role:</p>
          <select
            value={userrole}
            onChange={handleChange}
            className="border px-4 py-1"
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="w-fit block mx-auto border rounded-full p-1 px-2 bg-red-600 text-white"
          onClick={changeUserrole}
        >
          Change Role{" "}
        </button>
      </div>
    </div>
  );
}
