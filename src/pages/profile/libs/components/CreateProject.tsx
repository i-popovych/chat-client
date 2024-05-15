import { FC, useState } from 'react';

import { projectService } from '../../../../api/services/project/project.service';
import { Notification } from '../../../../packages/notification';

type Props = {
  refetchProjects: () => void;
};

export const CreateProject: FC<Props> = ({ refetchProjects }) => {
  const [isForm, setIsForm] = useState(false);
  const [projectName, setProjectName] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const onCreateBthClick = () => {
    setIsForm((prev) => !prev);
  };

  const onCreateProject = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await projectService.postProject({ project_name: projectName });
      Notification.success('Project created successfully');
      refetchProjects();
    } catch (error) {
      console.log('[onCreateProject]', error);
    } finally {
    }
  };

  return (
    <div>
      <div onClick={onCreateBthClick}>Create Project</div>
      {isForm && (
        <>
          <div>Project Name</div>
          <div className='bg-[red]'>
            <input type='text' value={projectName} onChange={onChange} />
          </div>
          <div>
            <button onClick={onCreateProject}>Create</button>
          </div>
        </>
      )}
    </div>
  );
};
