// utils/validation.js

// Example validation functions for registration and login data
const validateRegistrationData = (data) => {
  const errors = [];

  if (!data.username) {
    errors.push({ field: "username", message: "Username is required" });
  }

  if (!data.email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  if (!data.password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  return { isValid: errors.length === 0, errors };
};

const validateLoginData = (data) => {
  const errors = [];

  if (!data.email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Invalid email format" });
  }

  if (!data.password) {
    errors.push({ field: "password", message: "Password is required" });
  }

  return { isValid: errors.length === 0, errors };
};

const isValidEmail = (email) => {
  // Implement your email validation logic here
  // You can use regular expressions or other methods to validate the email format
  return true;
};

module.exports = { validateRegistrationData, validateLoginData };
