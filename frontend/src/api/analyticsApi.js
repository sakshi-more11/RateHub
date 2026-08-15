import axiosClient from './axiosClient';

export const getMyStoreDashboard = () => axiosClient.get('/users/my-store');