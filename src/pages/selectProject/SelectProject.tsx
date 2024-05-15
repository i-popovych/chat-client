import { userService } from '@/api/services/user/user.service';
import { ProjectList } from '@/components/ProjectList/ProjectList';
import { useLoading } from '@/hooks/useLoading';

import { SelectProjectHeader } from './libs/components/SelectProjectHeader';

export const SelectProject = () => {
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
      <div className='flex justify-center items-center mt-7'>
        <div>
          <h1 className='text-4xl'>My projects</h1>
        </div>
      </div>
      <div className='flex justify-center mt-5'>
        {projectsLoading && <p>Loading...</p>}
        {projects && <ProjectList projects={projects} />}
      </div>
    </SelectProjectHeader>
  );
};
