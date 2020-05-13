import React, { Component } from 'react'
import "./Sidebar.css"
import axios from 'axios';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dta: ''
    }
  }

  uploadImage = () => {
    var upload = document.querySelector('canvas');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      upload.style.backgroundImage = `url(${reader.result})`;
    }
    if (file) {
      reader.readAsDataURL(file);

      // console.log(file);
      var data = JSON.stringify({ "name": file.name, "Image type": file.type, "Image Size(KB)": (file.size) / 1024, "Last Modified Date": file.lastModifiedDate });
      this.setState({ dta: data });
      // console.log(data);
      // axios
      //     .post('https://labell.herokuapp.com/api/generate', data)
      //     .then(() => console.log('Data Send'))
      //     .catch(err => {
      //       console.error(err);
      //     });
    }
  }

  DataSend() {
    axios.post('https://labell.herokuapp.com/api/generate', this.state.dta)
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

  // getFile() {
  //   axios({
  //     url: 'https://labell.herokuapp.com/api/getfile',
  //     method: 'GET',
  //     responseType: 'blob',
  //   })
  //   .then((response) => {
  //     // console.log(response.data);
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute('download', 'file.json'); //or any other extension
  //     document.body.appendChild(link);
  //     link.click();

  //   });
  // }

  render() {
    return (
      <div className="wholeSidebar">
        <div>
          <label htmlFor="files" className="submitButton1" title="Select File to Upload"><i className="fa fa-file fa-3x"></i></label>
          <input id="files" accept="image/*" hidden="hidden" type="file" onChange={this.uploadImage} />
        </div>
        <div>
           <button className="submitButton" title="Draw Rectangle">
            <i className="fa fa-square fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Circle">
            <i className="fa fa-circle fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Polygon">
          <i class="fas fa-draw-polygon fa-3x"></i>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Line">
            <p>Line</p>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Draw Point">
            <p>Point</p>
          </button>
        </div>
        <div>
          <button className="submitButton" title="Save JSON">
            <i className="fa fa-save fa-3x"></i>
          </button>
        </div>
      </div>
    )
  }
}

export default Sidebar;
