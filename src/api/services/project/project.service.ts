import $baseAPI from '../../axios';
import { CreateProject } from './libs/types/createProject.type';

class ProjectService {
  postProject(params: CreateProject) {
    return $baseAPI.post('projects', { ...params });
  }
}

export const projectService = new ProjectService();
