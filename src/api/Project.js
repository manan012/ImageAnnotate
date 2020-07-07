import axios from 'axios';

export const getProject = async (projectId) => {
    return axios.get('/api/projects/'+projectId);
}

export const getProjects = async () => {
    return axios.get('/api/projects');
}

export const deleteProject = async (id) => {
    return axios.delete('/api/projects/'+id);
}

export const addProject = async (name, description) => {
    return axios.post('/api/projects', {name: name, description: description});
}

const PROJECT = {
    getProject: getProject,
    getProjects: getProjects,
    addProject: addProject,
    deleteProject: deleteProject
}

export default PROJECT;