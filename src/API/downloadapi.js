export const downloadResume = async () => {
  try {
    const response = await fetch("http://localhost:8000/download-resume/", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch resume");
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
  }
};
