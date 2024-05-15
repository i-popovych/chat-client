import { getStaticRoute } from '@/helpers/static/getStaticRoute';
import { useAppSelector } from '@/redux/hooks';

export const UserAvatar = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user || !user.avatar) return null;

  const imgLink = getStaticRoute(user.avatar);

  return (
    <div className='flex items-center gap-2'>
      <img src={imgLink} alt='user avatar' className='w-[55px] rounded-full' />
    </div>
  );
};
