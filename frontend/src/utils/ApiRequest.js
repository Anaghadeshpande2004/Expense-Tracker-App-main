// // const host = "https://expense-tracker-app-main-backend.vercel.app";
// // const host = "http://localhost:5000";
// // src/utils/ApiRequest.js
// const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// export const setAvatarAPI = `${host}/api/auth/setAvatar`;
// export const registerAPI = `${host}/api/auth/register`;
// export const loginAPI = `${host}/api/auth/login`;
// export const addTransaction = `${host}/api/v1/addTransaction`;
// export const getTransactions = `${host}/api/v1/getTransaction`;
// export const editTransactions = `${host}/api/v1/updateTransaction`;
// export const deleteTransactions = `${host}/api/v1/deleteTransaction`;
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const setAvatarAPI = `${BASE_URL}/api/auth/setAvatar`;
export const registerAPI = `${BASE_URL}/api/auth/register`;
export const loginAPI = `${BASE_URL}/api/auth/login`;

export const addTransaction = `${BASE_URL}/api/v1/addTransaction`;
export const getTransactions = `${BASE_URL}/api/v1/getTransaction`;
export const editTransactions = `${BASE_URL}/api/v1/updateTransaction`;
export const deleteTransactions = `${BASE_URL}/api/v1/deleteTransaction`;
