// Full Working Version (updated field names and error handling)

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./uploadDocumentPage.scss";

const UploadDocumentsPage = () => {
  const [propertyDoc, setPropertyDoc] = useState(null);
  const [cnic1, setCnic1] = useState(null);
  const [cnic2, setCnic2] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!propertyDoc || !cnic1 || !cnic2) {
      setUploadError("Please upload all required documents.");
      return;
    }

    const savedPost = JSON.parse(localStorage.getItem("newPostData"));
    if (!savedPost) {
      setUploadError("No post data found. Please fill the form again.");
      return;
    }

    const fullForm = new FormData();
    fullForm.append("propertyDoc", propertyDoc); // backend expects: propertyDoc
    fullForm.append("cnicFront", cnic1);        // backend expects: cnicFront
    fullForm.append("cnicBack", cnic2);         // backend expects: cnicBack
    fullForm.append("postData", JSON.stringify(savedPost.postData));
    fullForm.append("postDetail", JSON.stringify(savedPost.postDetail));

    try {
      setUploading(true);
      setUploadError(null);
      setUploadSuccess(false);

      const res = await fetch("http://localhost:8800/api/posts/upload", {
        method: "POST",
        body: fullForm,
        credentials: "include",
        
      });

      const result = await res.json();

      if (res.ok) {
        setUploadSuccess(true);
        localStorage.removeItem("newPostData");
        navigate("/profile");
      } else {
        setUploadError(result.message || "Upload failed.");
      }
    } catch (err) {
      setUploadError(err.message || "Unexpected error.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-wrapper">
      <div className="upload-card">
        <h1 className="upload-title">Upload Documents</h1>
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label>Property Document (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files && setPropertyDoc(e.target.files[0])}
              required
            />
            {propertyDoc && <p>Selected: {propertyDoc.name}</p>}
          </div>

          <div className="form-group">
            <label>CNIC Front (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files && setCnic1(e.target.files[0])}
              required
            />
            {cnic1 && <p>Selected: {cnic1.name}</p>}
          </div>

          <div className="form-group">
            <label>CNIC Back (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => e.target.files && setCnic2(e.target.files[0])}
              required
            />
            {cnic2 && <p>Selected: {cnic2.name}</p>}
          </div>

          {uploadSuccess && <div className="success-msg">Upload successful!</div>}
          {uploadError && <div className="error-msg">{uploadError}</div>}

          <div className="button-group">
            <button type="submit" className="btn upload-btn" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload"}
            </button>
            {/*
            <Link to="/properties/verification-status" className="btn verify-btn">
              Verify
            </Link>
            */}   
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocumentsPage;
