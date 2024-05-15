import { FC } from 'react';

import { Project } from '../../entities/Project';
import { ProjectItem } from '../UI/ProjectItem/ProjectItem';

type Props = {
  projects: Project[];
};

export const ProjectList: FC<Props> = ({ projects }) => {
  const renderProjects = () => {
    return projects.map((project) => <ProjectItem key={project.id} project={project} />);
  };

  return <div>{renderProjects()}</div>;
};
