import express from "express";
import {
  getEmployerApplications,
  getMyApplications,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";

const router = express.Router();

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Multer setup to use memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/post",
  isAuthenticated,
  upload.single("resume"),
  catchAsyncErrors(async (req, res, next) => {
    const { role, _id: userId } = req.user;

    if (role === "Employer") {
      return next(new ErrorHandler("Employer not allowed to apply for jobs.", 400));
    }

    const { name, email, phone, address, coverLetter, jobId } = req.body;
    const resumeFile = req.file;

    // Validation
    if (!name || !email || !phone || !address || !coverLetter || !jobId) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    if (!resumeFile) {
      return next(new ErrorHandler("Resume file is required.", 400));
    }

    if (resumeFile.size > 2 * 1024 * 1024) {
      return next(new ErrorHandler("Resume must be less than 2MB.", 400));
    }

    if (resumeFile.mimetype !== "application/pdf") {
      return next(new ErrorHandler("Only PDF files are allowed.", 400));
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }

    const alreadyApplied = await Application.findOne({
      "applicantID.user": userId,
      jobID: jobId,
    });

    if (alreadyApplied) {
      return next(new ErrorHandler("You have already applied for this job.", 400));
    }

    // Upload to Supabase Storage
    const fileName = `${req.user._id}_resume_${Date.now()}.pdf`;
    const storagePath = `resume/${fileName}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("resume")
      .upload(storagePath, resumeFile.buffer, {
        contentType: "application/pdf",
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("Supabase Upload Error:", uploadError);
      return next(new ErrorHandler("Resume upload failed.", 500));
    }

    // Get public URL from Supabase
    const { data: publicData } = supabase.storage
      .from("resume")
      .getPublicUrl(storagePath);

    const resumeUrl = publicData?.publicUrl;

    if (!resumeUrl) {
      return next(new ErrorHandler("Could not generate resume URL.", 500));
    }

    // Save to DB
    const application = await Application.create({
      name,
      email,
      phone,
      address,
      coverLetter,
      resume: {
        url: resumeUrl,
        fileName,
      },
      jobID: jobId,
      applicantID: {
        user: userId,
        role: "Job Seeker",
      },
      employerID: {
        user: job.postedBy,
        role: "Employer",
      },
    });

    res.status(201).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  })
);

// Other routes
router.get("/employer/getall", isAuthenticated, getEmployerApplications);
router.get("/myapplications", isAuthenticated, getMyApplications);
router.put("/update/:id", isAuthenticated, updateApplicationStatus);

export default router;
