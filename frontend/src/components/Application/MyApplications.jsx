import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    console.log("User data:", user);
    console.log("Is Authorized:", isAuthorized);

    const fetchApplications = async () => {
      try {
        if (user && user.role === "Employer") {
          const res = await axios.get(
            "http://localhost:4000/api/v1/application/employer/getall",
            { withCredentials: true }
          );
          setApplications(res.data.applications || []);
        } else {
          console.log("Fetching applications for Job Seeker...");
          const res = await axios.get(
            "http://localhost:4000/api/v1/application/myapplications",
            { withCredentials: true }
          );
          console.log("Job Seeker API response:", res.data);
          setApplications(res.data.myApplications || []);
        }
      } catch (error) {
        console.error("Error fetching applications:", error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Failed to fetch applications");
        setApplications([]);
      }
    };

    fetchApplications();
  }, [isAuthorized, user]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete application");
    }
  };

  const openModal = (url) => {
    setResumeUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <center>
            <h1>My Applications</h1>
          </center>
          {applications.length <= 0 ? (
            <center>
              <h4>No Applications Found</h4>
            </center>
          ) : (
            <JobSeekerGroupedApplications
              applications={applications}
              deleteApplication={deleteApplication}
              openModal={openModal}
            />
          )}
        </div>
      ) : (
        <div className="container">
          <center>
            <h1>Applications From Job Seekers</h1>
          </center>
          {applications.length <= 0 ? (
            <center>
              <h4>No Applications Found</h4>
            </center>
          ) : (
            <EmployerGroupedApplications
              applications={applications}
              openModal={openModal}
            />
          )}
        </div>
      )}
      {modalOpen && <ResumeModal url={resumeUrl} onClose={closeModal} />}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <button
          onClick={() => openModal(element.resume.url)}
          className="view-resume-btn"
        >
          View Resume
        </button>
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p>
          <span>Name:</span> {element.name}
        </p>
        <p>
          <span>Email:</span> {element.email}
        </p>
        <p>
          <span>Phone:</span> {element.phone}
        </p>
        <p>
          <span>Address:</span> {element.address}
        </p>
        <p>
          <span>CoverLetter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="resume">
        <button
          onClick={() => openModal(element.resume.url)}
          className="view-resume-btn"
        >
          View Resume
        </button>
      </div>
    </div>
  );
};

// Group applications by job and show per-job details for employers
const EmployerGroupedApplications = ({ applications, openModal }) => {
  const grouped = applications.reduce((acc, app) => {
    const jobId = app.jobID?._id;
    if (!jobId || !app.jobID?.title) return acc;
    if (!acc[jobId]) acc[jobId] = { job: app.jobID, apps: [] };
    acc[jobId].apps.push(app);
    return acc;
  }, {});

  const [openJob, setOpenJob] = React.useState(null);
  const jobList = Object.values(grouped);

  if (jobList.length === 0) {
    return <center><h4>No jobs with applications found.</h4></center>;
  }

  return (
    <div className="employer-job-group-list" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", margin: "2rem 0" }}>
        {jobList.map(({ job }) => (
          <button
            key={job._id}
            className={`employer-job-title-btn${openJob === job._id ? " active" : ""}`}
            onClick={() => setOpenJob(openJob === job._id ? null : job._id)}
            style={{
              minWidth: "260px",
              padding: "1.2rem 2rem",
              borderRadius: "12px",
              background: openJob === job._id ? "#2d5649" : "#fff",
              color: openJob === job._id ? "#fff" : "#222",
              fontWeight: 600,
              fontSize: "1.2rem",
              border: openJob === job._id ? "2px solid #2d5649" : "1.5px solid #e0e0e0",
              boxShadow: "0 2px 12px 0 rgba(45,86,73,0.07)",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {job.title}
          </button>
        ))}
      </div>
      {jobList.map(({ job, apps }) => (
        openJob === job._id && (
          <div className="employer-job-applications-list" key={job._id} style={{ margin: "2rem 0", width: "100%" }}>
            {apps.map((element) => (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            ))}
          </div>
        )
      ))}
    </div>
  );
};

// Group applications by job for job seekers
const JobSeekerGroupedApplications = ({ applications, deleteApplication, openModal }) => {
  console.log("Applications in JobSeekerGroupedApplications:", applications);

  const grouped = applications.reduce((acc, app) => {
    const jobId = app.jobID?._id || "unknown";
    const jobTitle = app.jobID?.title || "Unknown Job";

    if (!acc[jobId]) acc[jobId] = { job: { _id: jobId, title: jobTitle }, apps: [] };
    acc[jobId].apps.push(app);
    return acc;
  }, {});
  
  const jobList = Object.values(grouped);
  
  if (jobList.length === 0) {
    return <center><h4>No Applications Found</h4></center>;
  }

  return (
    <div className="jobseeker-job-group-list" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {jobList.map(({ job, apps }) => (
        <div className="jobseeker-job-group" key={job._id} style={{ width: "100%", marginBottom: "2.5rem" }}>
          <div style={{
            minWidth: "260px",
            padding: "1.2rem 2rem",
            borderRadius: "12px",
            background: "#fff",
            color: "#222",
            fontWeight: 600,
            fontSize: "1.2rem",
            border: "2px solid #2d5649",
            boxShadow: "0 2px 12px 0 rgba(45,86,73,0.07)",
            marginBottom: "1.5rem"
          }}>{job.title}</div>
          {apps.map((element) => (
            <JobSeekerCard
              element={element}
              key={element._id}
              deleteApplication={deleteApplication}
              openModal={openModal}
            />
          ))}
        </div>
      ))}
    </div>
  );
};