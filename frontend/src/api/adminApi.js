import axiosClient from './axiosClient';

export const getDashboardStats = () => axiosClient.get('/admin/dashboard');
export const getUsers = (params) => axiosClient.get('/admin/users', { params });
export const getStores = (params) => axiosClient.get('/admin/stores', { params });
export const getUserDetail = (id) => axiosClient.get(`/admin/users/${id}`);
export const addUser = (data) => axiosClient.post('/admin/users', data);
export const addStore = (data) => axiosClient.post('/admin/stores', data);