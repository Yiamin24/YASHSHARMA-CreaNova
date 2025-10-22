// src/API/downloadapi.js
const BACKEND_URL = "https://yashsharma-designfolio-backend.onrender.com/";

export const downloadResume = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/download-resume`, {
      method: "GET",
      credentials: "include", // optional, for cookies/session
    });

    if (!response.ok) throw new Error(`Failed to fetch resume. Status: ${response.status}`);

    const fileBlob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(fileBlob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "Yash_Sharma_Resume.pdf";
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("❌ Error downloading resume:", error);
    alert("Failed to download resume. Please try again later.");
  }
};
