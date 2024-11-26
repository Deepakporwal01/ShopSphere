import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdEdit } from "react-icons/md";
import Changerole from "../components/Changerole";
export default function Allusers() {
  const [alluser, setAlluser] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
   _id :""
  });
  const fetchallUsers = async () => {
    const fetchData = await fetch(SummaryApi.all_users.url, {
      method: SummaryApi.all_users.method,
      credentials: "include",
    })
    const dataApi = await fetchData.json();
    if (dataApi.success) {
      setAlluser(dataApi.data);
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  useEffect(() => {
    fetchallUsers();
  }, []);

  return (
    <div>
      <table className="w-full   border bg-white text-[16px]">
        <thead className="">
          <tr>
            <th>Sr.</th>
            <th> First Name</th>
            <th> Last Name</th>
            <th> Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>action</th>
          </tr>
        </thead>

        {alluser.map((el, index) => {
          return (
            <tr className="  text-center  ">
              <td className=" flex items-center justify-center">{index + 1}</td>
              <td className="">{el.firstname}</td>
              <td>{el.lastname}</td>
              <td>{el.email}</td>
              <td>{el.role}</td>
              <td>{moment(el.createdAt).format("LL")}</td>
              <td>
                <button
                  onClick={
                    () => {
                      setUpdateUserDetails(el)
                    setOpenUpdateRole(true);
                  }
                }
                  className=" rounded-full hover:bg-green-500 hover:text-white p-1  "
                >
                  {" "}
                  <MdEdit />
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      {openUpdateRole && (
        <Changerole
          onClose={() => {
            setOpenUpdateRole(false);
          }}
          email={updateUserDetails.email}
          name={updateUserDetails.firstname + " "+updateUserDetails.lastname}
          role={updateUserDetails.role}
          _id = {updateUserDetails._id}
        />
      )}
    </div>
  );
}
