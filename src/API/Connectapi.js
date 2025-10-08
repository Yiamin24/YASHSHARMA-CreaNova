// src/API/ConnectApi.js

export const submitConnectForm = async (formData) => {
  try {
    const response = await fetch("http://localhost:8000/submit-form/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to submit form");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};
