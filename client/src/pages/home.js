import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./home.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import{faUserPen,faTrashCan} from "@fortawesome/free-solid-svg-icons"



const Home = () => {
  const [data, setData] = useState([]);
 


  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  }, []);


  const deleteContact = (id)=>{
    if(window.confirm("Are you sure you want to Delete ?")){
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success('Student Details Deleted Successfully');
      setTimeout(()=>loadData(),500);
      
    }
  }
  return (
    <div>
      <h1>Student Management System</h1>
      <div className="search">
        <input class="search-btn" type="text" placeholder="search..."></input>
        <Link to={`/adduser`}>
          <a class="add" href="/adduser">
            ADD
          </a>
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>FirstName</td>
            <td>LastName</td>
            <td>Location</td>
            <td>Email</td>
            <td>DOB</td>
            <td>Education</td>
            <td>Action</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody className="tdata">
          {data.map((item, index) => {
            return (
              <tr key={item.ID}>
                <td>{item.ID}</td>
                <td>{item.FIRSTNAME}</td>
                <td>{item.LASTNAME}</td>
                <td>{item.LOCATION}</td>
                <td>{item.EMAIL}</td>
                <td>{item.DOB}</td>
                <td>{item.EDUCATION}</td>
                <td>
                  <Link to={`/update/${item.ID}`}> 
                  <FontAwesomeIcon icon={faUserPen} style={{color: "#747474",}} />
                    <a className="edit" href="">
                      Edit
                    </a>
                  </Link>
                </td>
                <td>
                  <Link to={"/"}>
                  <FontAwesomeIcon icon={faTrashCan} style={{color: "#747474",}} />
                    <a 
                      onClick={()=>deleteContact(item.ID)}
                      className="delete"
                      href="/deleteuser/{{this.ID}}"
                    >
                      Delete
                    </a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
