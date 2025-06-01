import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
    },
  ];

  const { user, isAuthorized } = useContext(Context);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all jobs on mount
    axios
      .get("http://localhost:4000/api/v1/job/getall", { withCredentials: true })
      .then((res) => {
        setJobs(res.data.jobs || []);
      })
      .catch(() => setJobs([]));
  }, []);

  const handleCategoryClick = (categoryTitle) => {
    // Only job seekers can apply
    if (!isAuthorized || !user || user.role !== "Job Seeker") return;
    // Check if there is at least one job posted by an employer in this category
    const hasJob = jobs.some(
      (job) => job.category === categoryTitle && job.postedBy && job.postedBy.role === "Employer"
    );
    if (!hasJob) return;
    // Redirect to application form, pre-filling the job name
    navigate(`/application-form?job=${encodeURIComponent(categoryTitle)}`);
  };

  return (
    <div className="categories">
      <h3>POPULAR CATEGORIES</h3>
      <div className="banner">
        {categories.map((element) => {
          return (
            <div
              className="card"
              key={element.id}
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick(element.title)}
            >
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
