const BACKEND_URL = "https://yashsharma-designfolio-backend.onrender.com";

export const submitConnectForm = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name || "",
        email: formData.email || "",
        phone: formData.phone || "",
        help_message: formData.help_message || "",
        budget: formData.budget || "",
      }),
      credentials: "include", // ✅ Good for cookies/session if backend uses them
    });

    // ✅ Safe JSON parsing
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    // ✅ Backend returned error
    if (!response.ok) {
      throw new Error(data.detail || data.message || "Failed to submit form");
    }

    return data; // ✅ Success

  } catch (error) {
    console.error("❌ Error submitting form:", error.message);
    alert(error.message || "Something went wrong. Please try again.");
    throw error;
  }
};
