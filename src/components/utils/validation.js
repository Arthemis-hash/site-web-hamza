// src/utils/validation.js
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone) => {
  const regex = /^[\+]?[1-9][\d]{0,15}$/;
  return regex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validatePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  return {
    ...checks,
    score,
    isValid: score >= 3,
    strength: score < 2 ? 'weak' : score < 4 ? 'medium' : 'strong',
  };
};