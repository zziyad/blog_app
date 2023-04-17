import { useEffect, useReducer, useRef } from "react";
import scaffolding from './client'
const { api } = scaffolding;


export const useApi = (type, method, args) => {
  const cache = useRef({});
  const initialState = {
    customer: [],
    status: 'idle',
    error: null,
    data: [],
  };

  const [state, dispatch] = useReducer((state, action) => {

    const states = {
      'FETCHING': { ...initialState, status: 'fetching' },
      'FETCHED': { ...initialState, status: 'fetched', data: action.payload },
      'FETCH_ERROR': { ...initialState, status: 'error', error: action.payload },
    };

    return states[action.type] || state;


  }, initialState);

  useEffect(() => {
    let cancelRequest = false;
    // if (!url || !url.trim()) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[method]) {
        const data = cache.current[method];
        console.log('From Cache');
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          await scaffolding.load(type);
          const data = await api[type][method](args);
          cache.current[method] = data;
          if (cancelRequest) return;
          console.log('From Fetch');
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };

  }, [type, method, args]);

  return state;
};
