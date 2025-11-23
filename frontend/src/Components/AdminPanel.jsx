import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../utility/UserSLice.js";
// import { data } from "react-router-dom";

const Adminpanel = () => {
  const { userList, isloading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <>
      {isloading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped text-center">
            <thead>
              <tr>
                {/* <th scope="col">S no.</th> */}
                <th scope="col">Name</th>
                <th scope="col">E-mail</th>
                <th scope="col">Photo</th>
                <th scope="col">Age</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((elm) => (
                <tr key={elm.email}>
                  <td>{elm.name}</td>
                  <td>{elm.email}</td>
                  <td>
                    <img
                      src={elm.image}
                      alt=""
                      width={"25px"}
                      height={"30  px"}
                    />
                  </td>
                  <td>{elm.age}</td>
                  <td>{elm.address}</td>
                  <td>
                    <button type="button" className="btn btn-danger mx-2">
                      Delete
                    </button>
                    <button type="button" className="btn btn-warning mx-2">
                      Edit
                    </button>
                    <button type="button" className="btn btn-success mx-2">
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
export default Adminpanel;
