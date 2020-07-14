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

export const addProject = async (name, description, datasetIds) => {
    return axios.post('/api/projects', {name: name, description: description, datasetIds: datasetIds});
}

export const inviteCollaborator = async (projectId, email) => {
    return axios.post('/api/projects/invite', {projectId, email});
}

export const acceptInvitation = async (id) => {
    return axios.put('/api/notifications/'+id, {status: 'ACCEPT'});
}

export const rejectInvitation = async (id) => {
    return axios.put('/api/notifications/'+id, {status: 'REJECTED'});
}

const PROJECT = {
    getProject: getProject,
    getProjects: getProjects,
    addProject: addProject,
    deleteProject: deleteProject,
    inviteCollaborator: inviteCollaborator,
    acceptInvitation: acceptInvitation,
    rejectInvitation: rejectInvitation,
}

export default PROJECT;