import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../store/scaffoldingSlice';

export const useScaffoldingData = ({ type, method, args }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.scaffolding.data);
  const status = useSelector((state) => state.scaffolding.status);
  const error = useSelector((state) => state.scaffolding.error);

  const loadDataCallback = () => {
    dispatch(loadData({ type, method, args }));
  }

  return { data, status, error, loadData: loadDataCallback };
};
