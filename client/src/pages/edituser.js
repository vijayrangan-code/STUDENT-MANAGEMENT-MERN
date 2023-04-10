import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "./home.css";
import { toast } from "react-toastify";
import axios from "axios";
// import { Toast } from "react-toastify/dist/components";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstname: "",
  lastname: "",
  location: "",
  email: "",
  dob: "",
  education: "",
};

const EditUser = () => {
  const [state, setState] = useState(initialState);

  const { firstname, lastname, location, email, dob, education } = state;

  const navigate = useNavigate();
  const locate = useLocation();
  console.log(locate);

  // edit and update data

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  // add data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname || !location || !email || !dob || !education) {
      toast.error("Please provide value into input field");
    } else {
      // update data

      await axios
        .put(`http://localhost:5000/api/update/${id}`, {
          firstname,
          lastname,
          location,
          email,
          dob,
          education,
        })
        .then(() => {
          setState({
            firstname: "",
            lastname: "",
            location: "",
            email: "",
            dob: "",
            education: "",
          });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Student Details Updated Sussefully");

      setTimeout(() => navigate("/", { replace: true }), 500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <h1>Edit Student Details</h1>

      <form method="post" action="/adduser" onSubmit={handleSubmit}>
        <div className="form-group1">
          <label htmlfor="firstname">FirstName :</label>
          <input
            type="text"
            name="firstname"
            onChange={handleInputChange}
            value={firstname || ""}
          />
          <label htmlfor="lastname">LastName :</label>
          <input
            type="text"
            name="lastname"
            onChange={handleInputChange}
            value={lastname || ""}
          />
        </div>
        <div className="form-group">
          <label htmlfor="location">Location :</label>
          <input
            type="text"
            name="location"
            onChange={handleInputChange}
            value={location || ""}
          />
        </div>
        <div className="form-group">
          <label htmlfor="email">Email :</label>
          <input
            type="text"
            name="email"
            onChange={handleInputChange}
            value={email || ""}
          />
        </div>
        <div className="form-group">
          <label htmlfor="dob">DOB :</label>
          <input
            type="date"
            name="dob"
            onChange={handleInputChange}
            value={dob || ""}
          />
        </div>
        <div className="form-group">
          <label htmlfor="education">Education :</label>
          <input
            type="text"
            name="education"
            onChange={handleInputChange}
            value={education || ""}
          />
        </div>
        <div className="form-group">
          <label htmlfor="about">About :</label>
          <input type="textarea" id="textarea" name="about" />
        </div>
        <div className="form-group">
          <button className="change-btn" type="submit">
            Save Changes
          </button>

          <Link to={"/"}>
            <a href="/">View All</a>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default EditUser;
