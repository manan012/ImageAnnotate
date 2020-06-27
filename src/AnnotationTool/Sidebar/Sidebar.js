import React, { Component } from 'react'
import "./Sidebar.css"
import axios from 'axios';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'

// This file has 2 main functions
//  1. It lets up upload file from the user's device (Code line: 22-36)
//  2. It lets you download JSON file to the user's device containing annotation details (Code line: 40-67 )


class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dta: '',
      imageFile: "",
      varx: false,
      rectangles: [],
    }
  }

  //Add new images to read
  newImages = (e) => {
    const images = [...e.target.files].map(imageFile => ({file: imageFile, readed: 0, image: "", annotations:{rectangles: [], circles: []}}))
    this.props.addImages(images)
  }

  // Image uploading on Canvas
  // uploadImage = () => {
  //   var file = document.querySelector('input[type=file]').files[0];
  //   var reader = new FileReader();
  //   reader.onload = () => {
  //     this.setState(() => { this.props.imageSet(reader.result) });
  //   }

  //   if (file) {
  //     reader.readAsDataURL(file);
  //     var data = JSON.stringify({ "name": file.name, "Image type": file.type, "Image Size(KB)": (file.size) / 1024, "Last Modified Date": file.lastModifiedDate });
  //     this.setState({ dta: data });
  //     this.setState({ varx: true });
  //     // console.log(reader.result);
  //   }
  // }

  // Downloading the Json File
  DataSend() {
    //this.state.rectangles=this.props.rectangles;
    var data = JSON.stringify(this.props.rectangles);
    this.setState({ dta: data });
    if (this.state.varx) {
      //console.log('hello');
      axios.post('https://labell.herokuapp.com/api/generate', data)
        .then(console.log('data send!'))
        .then(
          axios({
            url: 'https://labell.herokuapp.com/api/getfile',
            method: 'GET',
            responseType: 'blob',
          }).then((response) => {
            console.log(response.data);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.json'); //or any other extension
            document.body.appendChild(link);
            link.click();

          }).catch(err => {
            console.log('error1', err);
          }))
        .catch(err => { console.log('error2', err) })
    }
  }

  render() {
    return (
      <div className="">
        <div>
          <label htmlFor="file" className="submitButton" title="Select File to Upload"><i className="fas fa-file-upload fa-3x"></i></label>
          <input id="file" accept="image/*" hidden="hidden" type="file" onChange={this.newImages} />
        </div>
        <div>
          <label htmlFor="files" className="submitButton" title="Select File to Upload"><i class="fas fa-folder-open fa-3x"></i></label>
          <input id="files" accept="image/*" hidden="hidden" type="file" webkitdirectory="" directory="" onChange={this.newImages} />
        </div>
        <div>
          <button className="submitButton" title="Draw Rectangle" onClick={() => { this.props.buttonClick(true, false, false, false, false) }}>
            <i className="fas fa-vector-square fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Circle" onClick={() => { this.props.buttonClick(false, true, false, false, false) }}>
            <i className="far fa-circle fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Line" onClick={() => { this.props.buttonClick(false, false, true, false, false) }}>
            <i className="fas fa-pen fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Polygon" onClick={() => { this.props.buttonClick(false, false, false, true, false) }}>
            <i className="fas fa-draw-polygon fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Save JSON" onClick={() => this.DataSend()}>
            <i className="fas fa-download fa-3x"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Sidebar;
