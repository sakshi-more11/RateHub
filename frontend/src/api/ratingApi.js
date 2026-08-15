import axiosClient from './axiosClient';

export const submitRating = (data) => axiosClient.post('/ratings', data);
export const deleteRating = (storeId) => axiosClient.delete(`/ratings/${storeId}`);