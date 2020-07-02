import {saveAs} from 'file-saver';

const saveObjectAsJSONFfile = (obj, name) => {
    const blob = new Blob([JSON.stringify(obj)], {type: 'application/json;charset=utf-8'});
    saveAs(blob, name ? name+".json" : "file.json");
}

export default saveObjectAsJSONFfile;