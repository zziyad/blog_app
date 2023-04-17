import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadData } from '../store/scaffoldingSlice';

const useLoadData = ({ type, method, args }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData({ type, method, args }));
  }, [dispatch, type, method, args]);
};

export default useLoadData;
