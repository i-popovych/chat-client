import { FC, useState } from 'react';

import { Header } from '../../../../components/layout/Header/Header';
import { CreateProject } from './CreateProjectModal';
import { ProjectJoinModal } from './ProjectJoin';

type Props = {
  children: React.ReactNode;
  refetchProjects: () => void;
};

export const SelectProjectHeader: FC<Props> = ({ children, refetchProjects }) => {
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [joinProjectModal, setJoinProjectModal] = useState(false);

  const onCreateProject = () => {
    setCreateProjectModal((prev) => !prev);
  };

  const onJoinProject = () => {
    setJoinProjectModal((prev) => !prev);
  };

  const onCloseCreateProjModal = () => {
    setCreateProjectModal(false);
  };

  const onCloseJoinProjModal = () => {
    setJoinProjectModal(false);
  };

  return (
    <>
      <Header>
        <div className='flex gap-7 items-center ml-5'>
          <div
            onClick={onCreateProject}
            className='text-xl text-white cursor-pointer hover:shadow-sm hover:underline'
          >
            <span>Create Project</span>
          </div>
          <div
            onClick={onJoinProject}
            className='text-xl text-white cursor-pointer hover:shadow-sm hover:underline'
          >
            <span>Join to the Project</span>
          </div>
        </div>
      </Header>
      <CreateProject
        handleClose={onCloseCreateProjModal}
        isOpen={createProjectModal}
        refetchProjects={refetchProjects}
      />
      <ProjectJoinModal
        handleClose={onCloseJoinProjModal}
        isOpen={joinProjectModal}
        refetchProjects={refetchProjects}
      />
      {children}
    </>
  );
};
