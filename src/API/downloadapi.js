// src/API/downloadapi.js
const BACKEND_URL = "https://yashsharma-designfolio-backend.onrender.com";

export const downloadResume = async () => {
  try {
    // Add a timestamp to the URL to avoid any caching
    const timestamp = new Date().getTime();
    const response = await fetch(`${BACKEND_URL}/download-resume?t=${timestamp}`, {
      method: "GET",
      credentials: "include",
      cache: "no-store", // ensures browser doesn't cache it
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch resume. Status: ${response.status}`);
    }

    // Get dynamic filename from backend response
    const disposition = response.headers.get("Content-Disposition");
    let fileName = "YASH_SHARMA_DEV.pdf";
    if (disposition && disposition.includes("filename=")) {
      fileName = disposition.split("filename=")[1].replace(/["']/g, "");
    }

    // Convert to blob and trigger download
    const fileBlob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(fileBlob);

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);

    console.log(`✅ Download started: ${fileName}`);
  } catch (error) {
    console.error("❌ Error downloading resume:", error);
    alert("Failed to download resume. Please try again later.");
  }
};
