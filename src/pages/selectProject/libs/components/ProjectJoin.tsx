import { FC, useState } from 'react';

import { projectService } from '../../../../api/services/project/project.service';
import { Button } from '../../../../components/UI/Button/Button';
import { Notification } from '../../../../packages/notification';

type Props = {
  refetchProjects: () => void;
};

export const ProjectJoin: FC<Props> = ({ refetchProjects }) => {
  const [isForm, setIsForm] = useState(false);
  const [projectId, setProjectId] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectId(e.target.value);
  };

  const onCreateBthClick = () => {
    setIsForm((prev) => !prev);
  };

  const onJoinProject = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {
      await projectService.projectJoin({ project_id: projectId });
      Notification.success('Project joined successfully');
      refetchProjects();
    } catch (error) {
      console.log('[onCreateProject]', error);
    }

    e.preventDefault();
  };

  return (
    <div>
      <div onClick={onCreateBthClick} className='cursor-pointer hover:drop-shadow text-xl'>
        Join to the Project
      </div>
      {isForm && (
        <div className='flex flex-col gap-2 text-md mt-2'>
          <div className=' flex gap-1'>
            <div className='w-[80px] text-[1.1em]'>Project ID:</div>
            <div>
              <input type='text' value={projectId} onChange={onChange} />
            </div>
          </div>
          <div>
            <Button text='JOIN' handleClick={onJoinProject} />
          </div>
        </div>
      )}
    </div>
  );
};
