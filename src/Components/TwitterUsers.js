import React, { useEffect, useState } from "react";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TwitterUsers = () => {
  const [userData, setUserData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const API =
    "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json";

  const fetchData = async () => {
    let response = await Axios.get(API);
    setUserData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = (uid,fullname) => {
    let findUser = userData.filter((item) => item.uid !== uid);
    setUserData(findUser);
    toast(`${fullname} has been deleted`);
  };

  const sortData = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortedUserData = [...userData].sort((a, b) => {
    const sortValA = a.twubric[sortBy];
    const sortValB = b.twubric[sortBy];
    if (sortOrder === "asc") {
      return sortValA - sortValB;
    } else {
      return sortValB - sortValA;
    }
  });

  const filterByDate = (user) => {
    if (!startDate || !endDate) {
      return true;
    }
    const joinDate = new Date(user.join_date * 1000);
    return joinDate >= startDate && joinDate <= endDate;
  };

  const filteredUserData = sortedUserData.filter(filterByDate);

  return (
    <>
        <div className="mb-3 text-center">
          <h4 className="mb-2">Sort By</h4>
          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-primary"
              onClick={() => sortData("chirpiness")}
            >
              Chirpiness
            </button>
            <button
              className="btn btn-primary"
              onClick={() => sortData("total")}
            >
              Tubric Score
            </button>
            <button
              className="btn btn-primary"
              onClick={() => sortData("friends")}
            >
              Friends
            </button>
            <button
              className="btn btn-primary"
              onClick={() => sortData("influence")}
            >
              Influence
            </button>
          </div>
        </div>

        <div className="mb-3 text-center">
          <h4 className="mb-2">Select Joining Date Range</h4>
          <div className="d-flex justify-content-center gap-3">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="form-control shadow-none"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="form-control"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center flex-wrap">
          {filteredUserData.map((user, id) => (
            <div key={id} className="parent">
              <div className="d-flex align-items-center mb-3">
                <img
                  src={user.image}
                  alt=""
                  className="img-fluid userProfile"
                />
                <div>
                  <h5 className="m-0">{user.fullname}</h5>
                  <p className="titleheading">
                    Tubric Score: {user.twubric.total}
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="m-0 fw-bold">{user.twubric.chirpiness}</p>
                  <p className="paraheading">Chirpiness</p>
                </div>
                <div>
                  <p className="m-0 fw-bold">{user.twubric.friends}</p>
                  <p className="paraheading">Friends</p>
                </div>
                <div>
                  <p className="m-0 fw-bold">{user.twubric.influence}</p>
                  <p className="paraheading">Influence</p>
                </div>
              </div>
              <div className="mt-3">
                <p className="paraheading">
                  Joined: {new Date(user.join_date * 1000).toLocaleDateString()}
                </p>
                <button
                  className="btnStyle"
                  onClick={() => deleteUser(user.uid,user.fullname)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
    </>
  );
};

export default TwitterUsers;
