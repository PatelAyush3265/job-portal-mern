import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (!isAuthorized) {
    navigateTo("/");
  }

  // Normalize string: remove spaces, lowercase
  const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();

  // Filter jobs by search
  const filteredJobs = jobs.jobs
    ? jobs.jobs.filter((element) => {
        const searchNorm = normalize(search);
        return (
          normalize(element.title).includes(searchNorm) ||
          normalize(element.category).includes(searchNorm)
        );
      })
    : [];

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="job-search-bar">
          <input
            type="text"
            placeholder="Search jobs by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="job-search-input"
          />
        </div>
        <div className="banner">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })
          ) : (
            <p style={{ margin: "2rem auto", fontSize: "1.5rem", color: "#888" }}>No jobs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
