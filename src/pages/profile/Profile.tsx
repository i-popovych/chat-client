import { userService } from '../../api/services/user/user.service';
import { ProjectList } from '../../components/ProjectList/ProjectList';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { useLoading } from '../../hooks/useLoading';
import { useAppSelector } from '../../redux/hooks';
import { CreateProject } from './libs/components/CreateProject';
import { ProjectJoin } from './libs/components/ProjectJoin';

export const ProfilePage = () => {
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
    <>
      {user && <UserInfo username={user.email} />}
      <div className='flex'>
        <CreateProject refetchProjects={refetchProjects} />
        <ProjectJoin />
      </div>
      <div className='flex justify-center'>
        {projectsLoading && <p>Loading...</p>}
        {projects && <ProjectList projects={projects} />}
      </div>
    </>
  );
};
