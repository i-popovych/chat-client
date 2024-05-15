import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Project } from '../../../entities/Project';
import './projectItem.scss';

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = ({ project }) => {
  const navigate = useNavigate();

  const onProjectClick = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div className='flex gap-7 justify-between py-3 px-2 project-item'>
      <div className='cursor-pointer'>Project name: {project.project_name}</div>
      <div>Project join id: {project.id}</div>
    </div>
  );
};
