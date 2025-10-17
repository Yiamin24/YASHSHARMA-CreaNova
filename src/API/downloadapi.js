// src/API/downloadapi.js

// ✅ Set your deployed backend URL
const BACKEND_URL = "https://yashsharma-designfolio-backend.onrender.com";

export const downloadResume = async () => {
  try {
    // ✅ Removed trailing slash to match backend route
    const response = await fetch(`${BACKEND_URL}/download-resume`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch resume. Status: ${response.status}`);
    }

    const file = await response.blob();
    const url = window.URL.createObjectURL(file);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Yash_Sharma_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading resume:", error);
    alert("Failed to download resume. Please try again later.");
  }
};
