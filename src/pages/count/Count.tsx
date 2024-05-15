import * as countSlice from '@/redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import styles from './Count.module.scss';

export const Count = () => {
  const dispatch = useAppDispatch();
  const { count } = useAppSelector((state) => state.user);

  return (
    <div className={styles.count}>
      <button onClick={() => dispatch(countSlice.increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(countSlice.decrement())}>Decrement</button>
    </div>
  );
};
