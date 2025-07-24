import axios from "axios";

export default async function isLoggedIn() {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const token = localStorage.getItem("token");

  if (!token) {
    return false; // Token is not present
  }

  try {
    const response = await axios.post(
      `${SERVER_URL}/api/validate`,
      null, // You don't need to send a request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      // Token is valid
      return true;
    }
  } catch (error) {
    console.error("Error validating token:", error);
    // Token is not valid, remove it from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");

    // Reload the page and navigate to '/'
    window.location.href = '/'; // This will reload the page and navigate to '/'
    
    return false;
  }

  // If the token is present but not valid, return false
  return false;
}
