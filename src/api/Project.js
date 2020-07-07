import axios from 'axios';

export const getProject = async (projectId) => {
    return axios.get('/api/projects/'+projectId);
}

export const getProjects = async () => {
    return axios.get('/api/projects');
}

const PROJECT = {
    getProject: getProject,
    getProjects: getProjects
}

export default PROJECT;