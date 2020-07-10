import axios from 'axios';


const fetchDataset = async (id) => {
    console.log("idlog", id);
    return axios.get('/api/datasets/'+id);
}
const fetchDatasets = async () => {
    return axios.get('/api/datasets/');
}

const createDatasetWithImages = async (images, datasetName) => {
    const formData = new FormData();
    formData.append('datasetName', datasetName);
    for (const key of Object.keys(images)) {
        console.log(key);
        formData.append('images', images[key])
    }
    return axios.post('/api/datasets/createdatasetanduploadimages', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const createDataset = async (datasetName) => {
    return axios.post('/api/datasets/', {datasetName});
} 

const deleteDataset = async (id) => {
    return axios.delete('/api/datasets/'+id);
}

const deleteImages = async (datasetId, imagesIds) => {
    console.log(datasetId, imagesIds);
    return axios.post('/api/datasets/deleteimages', {datasetId: datasetId, imageIds: imagesIds});
}

const uploadImages = async (datasetId, images) => {
    const formData = new FormData();
    formData.append('datasetId', datasetId);
    for (const key of Object.keys(images)) {
        console.log(key);
        formData.append('images', images[key])
    }
    return axios.put('/api/datasets/uploadimages', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default {
    fetchDatasets,
    fetchDataset,
    createDatasetWithImages,
    createDataset,
    deleteDataset,
    deleteImages,
    uploadImages
};