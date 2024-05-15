import { FC, useState } from 'react';

import { projectService } from '../../../../api/services/project/project.service';
import { Button } from '../../../../components/UI/Button/Button';
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
      <div onClick={onCreateBthClick} className='cursor-pointer hover:drop-shadow text-xl'>
        Create Project
      </div>
      {isForm && (
        <div className='flex flex-col gap-2 text-md mt-2'>
          <div className=' flex gap-1'>
            <div className='w-[110px] text-[1.1em]'>Project Name:</div>
            <div>
              <input type='text' value={projectName} onChange={onChange} />
            </div>
          </div>
          <div>
            <Button text='Create' handleClick={onCreateProject} />
          </div>
        </div>
      )}
    </div>
  );
};
