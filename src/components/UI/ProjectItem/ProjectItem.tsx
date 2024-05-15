import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Project } from '../../../entities/Project';
import { setProject } from '../../../redux/features/project/projectSlice';
import { PrivateRoutes } from '../../Routes/libs/constants/privateRoutes.enum';
import './projectItem.scss';

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = ({ project }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onProjectClick = () => {
    dispatch(setProject(project));
    navigate(PrivateRoutes.DASHBOARD);
  };

  return (
    <div className='flex gap-7 justify-between py-3 px-2 project-item'>
      <div className='cursor-pointer' onClick={onProjectClick}>
        Project name: {project.project_name}
      </div>
      <div>Project join id: {project.id}</div>
    </div>
  );
};
