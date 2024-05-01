// useCustomQuery.js
import { useQuery } from 'react-query';
import api from './api'; 

const defaultEndpoint = '/';
const defaultQueryKey = 'default';

export function useCustomQuery(endpoint = defaultEndpoint, queryKey = defaultQueryKey) {
  return useQuery(queryKey, async () => {
    const { data } = await api.get(endpoint);
    return data;
  });
}