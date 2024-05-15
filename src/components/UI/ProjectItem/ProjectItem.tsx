import { FC } from 'react';

import { Project } from '../../../entities/Project';

type Props = {
  project: Project;
};

export const ProjectItem: FC<Props> = ({ project }) => {
  return (
    <div>
      <div>{project.project_name}</div>
      <div>{project.id}</div>
    </div>
  );
};
