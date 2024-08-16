// import { useContext } from 'react';
// import { useQuery, useMutation, useQueryClient } from 'react-query';
// import axios from 'axios';
// import { AuthContext } from './Auth/AuthContext';

// const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// const api = axios.create({
//   baseURL: API_BASE_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export const useApi = () => {
//   const { token } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   const get = (endpoint, queryKey) =>
//     useQuery(queryKey, async () => {
//       const response = await api.get(endpoint);
//       return response.data;
//     });

//   const post = (endpoint) =>
//     useMutation(
//       async (data) => {
//         const response = await api.post(endpoint, data);
//         return response.data;
//       },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries();
//         },
//       }
//     );

//   const put = (endpoint) =>
//     useMutation(
//       async (data) => {
//         const response = await api.put(endpoint, data);
//         return response.data;
//       },
//       {
//         onSuccess: () => {
//           queryClient.invalidateQueries();
//         },
//       }
//     );

//   return { get, post, put };
// };


// useApi.js
import { useContext } from 'react';
import { useQuery, useMutation } from 'react-query';
import axios from 'axios';
import { AuthContext } from './Auth/AuthContext';

export function useGetApi(endpoint, queryKey) {
  const { token } = useContext(AuthContext);

  const fetchData = async () => {
    const config = {
      method: 'get',
      url: `${import.meta.env.VITE_APP_API_BASE_URL}${endpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    };

    const response = await axios(config);
    return response.data;
  };

  return useQuery(queryKey, fetchData, { enabled: !!token, retry: 3 });
}

export function usePostApi(endpoint, data) {
  const { token } = useContext(AuthContext);

  const postData = async () => {
    const config = {
      method: 'post',
      url: `${import.meta.env.VITE_APP_API_BASE_URL}${endpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
      data,
    };

    const response = await axios(config);
    return response.data;
  };

  return useMutation(postData);
}