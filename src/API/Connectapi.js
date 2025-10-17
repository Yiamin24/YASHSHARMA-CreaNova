// src/API/ConnectApi.js

// ✅ 1. Use your deployed backend URL (NO trailing slash)
const BACKEND_URL = "https://yashsharma-designfolio-backend.onrender.com";

// ✅ 2. API call function
export const submitConnectForm = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // ✅ Ensure proper format
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        help_message: formData.help_message,
        budget: formData.budget,
      }),
    });

    // ✅ 3. Parse response safely
    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    // ✅ 4. Throw custom backend error if needed
    if (!response.ok) {
      throw new Error(data.detail || "Failed to submit form");
    }

    return data; // ✅ success
  } catch (error) {
    console.error("❌ Error submitting form:", error.message);

    // ✅ Optional UI feedback
    alert(error.message || "Something went wrong. Please try again.");

    throw error; // allow frontend to control UI (loading, etc.)
  }
};
