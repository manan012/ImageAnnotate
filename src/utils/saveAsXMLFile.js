import {saveAs} from 'file-saver';
var o2x = require('object-to-xml');

const saveObjectAsXMLFile = (data, name) => {
    var obj = { 
        '?xml version=\"1.0\" encoding=\"iso-8859-1\"?' : null,
        data: data
      };
    const blob = new Blob([o2x(obj)], {type: 'application/xml;charset=utf-8'});
    saveAs(blob, name ? name+".xml" : "file.xml");
}

export default saveObjectAsXMLFile;