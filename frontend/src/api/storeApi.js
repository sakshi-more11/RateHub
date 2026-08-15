import axiosClient from './axiosClient';

export const browseStores = (params) => axiosClient.get('/stores', { params });
export const getTopRated = () => axiosClient.get('/stores/top-rated');