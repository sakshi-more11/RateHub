import axiosClient from './axiosClient';

export const changePassword = (data) => axiosClient.put('/users/password', data);
export const getMyStoreDashboard = () => axiosClient.get('/users/my-store');