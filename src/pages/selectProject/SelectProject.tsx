import { userService } from '@/api/services/user/user.service';
import { ProjectList } from '@/components/ProjectList/ProjectList';
import { UserInfo } from '@/components/UserInfo/UserInfo';
import { useLoading } from '@/hooks/useLoading';
import { useAppSelector } from '@/redux/hooks';

import { SelectProjectHeader } from './libs/components/SelectProjectHeader';

export const SelectProject = () => {
  const { user } = useAppSelector((state) => state.user);

  const fetchUserProjects = async () => {
    try {
      const response = await userService.getProjects();
      return response.data;
    } catch (error) {
      console.log('[fetchUserProjects ~ error]', error);
      return null;
    }
  };
  const {
    data: projects,
    loading: projectsLoading,
    refetchData: refetchProjects,
  } = useLoading(fetchUserProjects);

  return (
    <SelectProjectHeader refetchProjects={refetchProjects}>
      {user && <UserInfo username={user.email} />}
      <div className='flex justify-center mt-5'>
        {projectsLoading && <p>Loading...</p>}
        {projects && <ProjectList projects={projects} />}
      </div>
    </SelectProjectHeader>
  );
};
