import React, { Fragment } from 'react';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
import './Start.css';
import {
  Link,
} from "react-router-dom";
import { Button } from 'reactstrap';
import Logo from './edunomics_logo.png';

class Start extends React.Component {
  constructor() {
    super()
    this.state = {
      importColor: 'import ',
      message: "Annotator \n image_url =  ",
      linkColor: "'https://Annotator.com/tesla_model3.jpg' \n ",
      message1: "datasets = Annotator.datasets() \n Annotator.add_row_to_dataset({ \n ",
      message2: "'dataset_id'",
      message3: ":datasets[0]['id'], \n ",
      message4: "'data'",
      message5: ":image_url \n})",
      message6: "",
      message7: "",
      message8: "",
      message9: "",
      message10: "",
    }
  }
  

  componentDidMount() {
    // this.props.history.push
    const navBar = document.querySelector(".nav");
    const navButton = document.querySelector(".nav-toggle");

    function toggleNavigation() {
      if (navBar.classList.contains("is-open")) {
        this.setAttribute("aria-expanded", false);
        navBar.classList.remove("is-open");
      } else {
        navBar.classList.add("is-open");
        this.setAttribute("aria-expanded", true);
      }
    }

    navButton.addEventListener("click", toggleNavigation);
  }

  //When Button1 is pressed on the start page
  updateContent1 = () => {
    this.setState({
      importColor: 'import ',
      message: "Annotator \n image_url =  ",
      linkColor: "'https://Annotator.com/tesla_model3.jpg' \n ",
      message1: "datasets = Annotator.datasets() \n Annotator.add_row_to_dataset({ \n ",
      message2: "'dataset_id'",
      message3: ":datasets[0]['id'], \n ",
      message4: "'data'",
      message5: ":image_url \n})",
      message6: "",
      message7: "",
      message8: "",
      message9: "",
      message10: "",
    });


  }

  //When Button2 is pressed on the start page
  updateContent2 = () => {
    this.setState({
      importColor: 'import ',
      message: "Annotator \n projects = Annotator.projects() \n images = Annotator.dataRows() \n  Annotator.create_label({ \n ",
      linkColor: "'project_id'",
      message1: ":projects[0]['id'], \n ",
      message2: "'label'",
      message3: ":",
      message4: "'damaged'",
      message5: ", \n",
      message6: "'image_id'",
      message7: ":images[0]['id'] \n })",
      message8: "",
      message9: "",
      message10: "",
    });
  }

  //When Button3 is pressed on the start page
  updateContent3 = () => {
    this.setState({
      importColor: 'import ',
      message: "Annotator \n projects = Annotator.projects() \n images = Annotator.dataRows() \n models = Annotator.predictionModels() \n Annotator.create_prediction({ \n ",
      linkColor: "'label'",
      message1: ":",
      message2: "'damaged'",
      message3: ", \n",
      message4: "'project_id'",
      message5: ": projects[0]['id'], \n ",
      message6: "'image_id'",
      message7: "images[0]['id'], \n ",
      message8: "'model_id'",
      message9: ":models[0]['id'] \n })",
      message10: "",
    })

  }

  //When Button4 is pressed on the start page
  updateContent4 = () => {
    this.setState({
      importColor: 'import ',
      message: "Annotator \n projects = Annotator.projects() \n labels = Annotator.exportLabels({ \n ",
      linkColor: "'project_id'",
      message1: ":projects[0][id] \n })",
      message2: "",
      message3: "",
      message4: "",
      message5: "",
      message6: "",
      message7: "",
      message8: "",
      message9: "",
      message10: "",

    });
  }


  render() {
    return (
      <Fragment>
        <header id="header" class="header">
          <Link to='/'>
            <img src={Logo} class="logo" alt="Edunomics" id="header-img" style={{ height: '100px' }} />
          </Link>
          <nav id="nav-bar" class="nav">
            <ul class="nav-list">
              {/* <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li> */}
              <li class="nav-item ">
                <Link to='/signin' class="nav-link">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link to='/signin' class="nav-link">
                  Signup
               </Link>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="#">Contact Us</a>
              </li> */}
            </ul>
          </nav>
          <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
            <span class="visuallyhidden">Menu</span>
            <span class="hamburger"></span>
          </button>

        </header>
        <div style={{ marginTop: '100px' }}>
          <main>
            <section class="intro">
              <h1 class="intro__title" style={{ fontSize: '5rem' }}>
                Image Annotation
        </h1>
              <p className="intro__subtitle" style={{ fontSize: '2.0rem' }}>
                Data is the fuel to AI and, for the same
                AI starts with quality data with good annotation,
        High quality training and validation data for AI applications</p>
              {/* <a href="#" class="button">Get Started</a> */}
              <img class="intro__illustration" src="https://res.cloudinary.com/alexandracaulea/image/upload/v1583497233/intro-illustration_qneuer.svg" alt="" />
            </section>


            <section id="features" class="features">
              <h2 class="visuallyhidden">Features</h2>
              <ul class="features__list">
                <li>
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 512 512" width="170" height="170" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve">

<g id="operating_system">
	<path fill="#5F6CB0" d="M448,144h-1.7c6.4-12.4,9.7-26.1,9.7-40c0-48.6-39.4-88-88-88c-40.3,0-75.5,27.5-85.3,66.6
		c-27.2-25.8-70.2-24.7-96,2.5c-12,12.6-18.7,29.4-18.6,46.8c0.1,4.3,1.2,8.5,3.2,12.2c-1.1,0.1-2.3,0.3-3.4,0.6
		c-14-11.5-43.7-16.9-71.8-16.9c-38.6,0-80,10-80,32v144c0,22,41.4,32,80,32s80-10,80-32v-64h272c26.5,0,48-21.5,48-48
		S474.5,144,448,144z M160,304c0,4.1-22,16-64,16s-64-11.9-64-16v-27.8c20.2,8.6,42.1,12.6,64,11.8c21.9,0.8,43.8-3.3,64-11.8V304z
		 M160,256c0,4.1-22,16-64,16s-64-11.9-64-16v-27.8c20.2,8.6,42.1,12.6,64,11.8c21.9,0.8,43.8-3.3,64-11.8V256z M160,208
		c0,4.1-22,16-64,16s-64-11.9-64-16v-27.8c20.2,8.6,42.1,12.6,64,11.8c21.9,0.8,43.8-3.3,64-11.8V208z M96,176c-42,0-64-11.9-64-16
		s22-16,64-16s64,11.9,64,16S138,176,96,176z M448,224H176v-64h8c2.6,0,5-1.3,6.6-3.4c1.5-2.2,1.8-4.9,1-7.4c-1-2.7-2.3-5.4-3.8-7.9
		c-1.9-2.8-3.2-6-3.8-9.4c0-28.7,23.2-52,51.9-52c18.7,0,36,10,45.3,26.3c2.2,3.8,7.1,5.2,10.9,3c2.5-1.4,4-4,4.1-6.9
		c0.7-39.8,33.6-71.4,73.3-70.7s71.4,33.6,70.7,73.3c-0.3,15.2-5.4,29.9-14.5,42.1c-2.7,3.5-1.9,8.5,1.6,11.2c1.4,1,3.1,1.6,4.8,1.6
		H448c17.7,0,32,14.3,32,32S465.7,224,448,224L448,224z"/>
	<path fill="#5F6CB0" d="M501.1,450.9c-1.5-1.8-3.7-2.9-6.1-2.9h-7V280c0-13.2-10.8-24-24-24H208c-13.2,0-24,10.8-24,24v168h-7
		c-4.4,0-8,3.6-8,8c0,0.4,0,0.9,0.1,1.3l3.7,20.5c0,0.3,0.1,0.6,0.2,0.9c3,10.2,12.4,17.2,23,17.3h280c10.6-0.1,20-7.1,23-17.3
		c0.1-0.3,0.2-0.6,0.2-0.9l3.7-20.5C503.3,455,502.6,452.7,501.1,450.9L501.1,450.9z M200,280c0-4.4,3.6-8,8-8h256c4.4,0,8,3.6,8,8
		v168H360c-4.4,0-8,3.6-8,8h-32c0-4.4-3.6-8-8-8H200V280z M483.6,474.6c-1.1,3.2-4.2,5.4-7.6,5.4H196c-3.4,0-6.5-2.2-7.6-5.4
		l-1.8-10.6H304c0,4.4,3.6,8,8,8h48c4.4,0,8-3.6,8-8h117.4L483.6,474.6z"/>
	<path fill="#5F6CB0" d="M88,352h16v16H88V352z"/>
	<path fill="#5F6CB0" d="M104,384H88v88c0,4.4,3.6,8,8,8h56v-16h-48V384z"/>
	<path fill="#5F6CB0" d="M368,360c0-17.7-14.3-32-32-32s-32,14.3-32,32s14.3,32,32,32S368,377.7,368,360z M320,360c0-8.8,7.2-16,16-16
		s16,7.2,16,16s-7.2,16-16,16S320,368.8,320,360z"/>
	<path fill="#5F6CB0" d="M320,432h32c3.7,0,6.9-2.5,7.8-6.1l1.3-5.3l4.7,2.8c3.1,1.9,7.2,1.4,9.8-1.2l22.6-22.6
		c2.6-2.6,3.1-6.6,1.2-9.8l-2.8-4.7l5.3-1.3c3.6-0.9,6.1-4.1,6.1-7.8v-32c0-3.7-2.5-6.9-6.1-7.8l-5.3-1.3l2.8-4.7
		c1.9-3.1,1.4-7.2-1.2-9.8l-22.6-22.6c-2.6-2.6-6.6-3.1-9.8-1.2l-4.7,2.8l-1.3-5.3c-0.9-3.6-4.1-6.1-7.8-6.1h-32
		c-3.7,0-6.9,2.5-7.8,6.1l-1.3,5.3l-4.7-2.8c-3.1-1.9-7.2-1.4-9.8,1.2l-22.6,22.6c-2.6,2.6-3.1,6.6-1.2,9.8l2.8,4.7l-5.3,1.3
		c-3.6,0.9-6.1,4.1-6.1,7.8v32c0,3.7,2.5,6.9,6.1,7.8l5.3,1.3l-2.8,4.7c-1.9,3.1-1.4,7.2,1.2,9.8l22.6,22.6c2.6,2.6,6.6,3.1,9.8,1.2
		l4.7-2.8l1.3,5.3C313.1,429.5,316.3,432,320,432z M303.3,406.5l-13.8-13.8l5.2-8.6c2.3-3.8,1-8.7-2.7-11c-0.7-0.4-1.4-0.7-2.2-0.9
		l-9.8-2.4v-19.5l9.8-2.4c4.3-1.1,6.9-5.4,5.8-9.7c-0.2-0.8-0.5-1.5-0.9-2.2l-5.2-8.6l13.8-13.8l8.6,5.2c3.8,2.3,8.7,1,11-2.7
		c0.4-0.7,0.7-1.4,0.9-2.2l2.4-9.8h19.5l2.4,9.8c1.1,4.3,5.4,6.9,9.7,5.8c0.8-0.2,1.5-0.5,2.2-0.9l8.6-5.2l13.8,13.8l-5.2,8.6
		c-2.3,3.8-1,8.7,2.7,11c0.7,0.4,1.4,0.7,2.2,0.9l9.8,2.4v19.5l-9.8,2.4c-4.3,1.1-6.9,5.4-5.8,9.7c0.2,0.8,0.5,1.5,0.9,2.2l5.2,8.6
		l-13.8,13.8l-8.6-5.2c-2.2-1.3-4.8-1.5-7.2-0.5c-2.3,1-4.1,3-4.7,5.5l-2.4,9.8h-19.4l-2.4-9.8c-1.1-4.3-5.4-6.9-9.7-5.8
		c-0.8,0.2-1.5,0.5-2.2,0.9L303.3,406.5z"/>
	<path fill="#5F6CB0" d="M424,352h32v16h-32V352z"/>
	<path fill="#5F6CB0" d="M216,352h32v16h-32V352z"/>
	<path fill="#5F6CB0" d="M236,112V96c-18.3,0-33.6,13.7-35.8,31.8l15.9,1.9C217.3,119.6,225.9,112,236,112z"/>
	<path fill="#5F6CB0" d="M408,104h16c0-30.9-25.1-56-56-56v16C390.1,64,408,81.9,408,104z"/>
</g>
</svg>

                  <p><strong>Annotation - Let Edunomics bring the best of DATA Platform for AI</strong></p>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="170" height="170" viewBox="0 0 512.2 512.2" style={{ enableBackground: "new 0 0 512.2 512.2" }} xmlSpace="preserve">
                    <g transform="translate(-1 -1)">

                      <path fill="#5F6CB0" d="M471,248.6c13.3-72.4-8.4-172-87.7-219.4C333.2,1.1,274.1-6.4,218.6,8.5C141.7,29,85.2,84.2,67.4,156
				c-4,14.6-5.6,29.7-5,44.8c0.9,9.4,2.6,18.6,5.2,27.7c3.5,11.5,5.2,23.5,5.1,35.5c-0.4,14.3-10.2,29.1-18.9,42.2
				c-9.5,14.3-17.7,26.6-12.9,38c4.5,7.7,12.4,12.8,21.3,13.7c0.5,0.1,1,0.1,1.5,0.2c2.4-0.3,4.8,0.5,6.5,2.1s2.6,4,2.5,6.4
				c0,17.7,0.4,26.9,7.8,31.1c-0.6,1.3-1.1,2.8-1.3,4.2c-0.7,5,1.1,10,4.8,13.5c3.7,3.6,8.4,6,13.5,6.9c0.4,0.1,0.7,0.1,1,0.2
				c0.2,1.3,0.3,2.6,0.3,3.8c-0.1,3.2-0.3,6.3-0.7,9.5c-1.4,13.6-3.4,32.3,24,41.3c5.5,1.5,11.2,2.2,16.9,2
				c25.9-1.1,51.4-6,75.9-14.5c7.1,12.3,11.3,26,12.5,40.2c0,2.3,0.9,4.4,2.5,6c1.6,1.6,3.8,2.5,6,2.5h213.3c3.6,0,6.9-2.4,8-5.9
				c1.1-3.5-0.1-7.4-3-9.6c-8.8-6.7-38.1-77.3-39-102.7c2.6-5.9,6-12.4,10.1-20.1C447.5,335.7,462.9,293,471,248.6z M398,394.1
				c0.2,20.4,18.6,74.3,34.4,102H243.6c-2.1-13.1-6.4-25.7-12.5-37.4c24.7-9.7,46.5-22.1,57-35.8c2.8-3.7,2.1-9.1-1.6-11.9
				c-3.7-2.9-9.1-2.1-12,1.6c-24.1,31.6-124.6,55.6-147.1,48.3c-14.2-4.6-13.6-10.1-12.3-23.3c0.5-3.7,0.7-7.5,0.8-11.3
				c0-14.4-5.8-18.7-14.5-20.7c-1.6-0.2-3.2-0.8-4.6-1.8c1.7-1.6,3.6-2.9,5.6-4c3.6-1.8,5.4-5.7,4.6-9.6s-4.3-6.6-8.3-6.6
				c-3.1,0-6.5,0-8.3-0.2c-0.5-5.6-0.7-11.2-0.6-16.8c0.2-6.7-2.4-13.2-7.1-18.1s-11.2-7.5-17.9-7.5c-6.2-1.3-8-3-8.2-3.4
				c-1.2-3,7-15.3,11.4-22c9.5-14.3,21.3-32,21.8-51.2c0.2-10.7-0.9-21.3-3.5-31.7c9.3-8.2,20.3-14.2,32.2-17.7
				c4.2-0.7,8.6-0.4,12.7,0.9c4.5,1.3,9.2-1.4,10.5-6c1.3-4.5-1.4-9.2-6-10.5c-6.7-2.1-13.8-2.5-20.8-1.1
				c-12.1,3.1-23.3,8.7-33.1,16.4c-1.2-5-2-10-2.4-15.1c-0.6-13.3,0.9-26.6,4.5-39.4c16.5-66.7,67.2-115.9,139-135.2
				c51-13.7,105.4-6.9,151.5,18.9c72.3,43.3,92,134.9,79.7,201.7c-7.7,42.7-22.6,83.7-44,121.3c-4.7,8.8-8.7,16.3-11.7,23.3
				C398,391.4,397.8,392.7,398,394.1z"/>
                      <path fill="#5F6CB0" d="M414.9,268.1c1.2-13.2-7.8-25.1-20.8-27.5l-16.3-22.7c1-1.8,1.8-3.8,2.3-5.9l15.8-6.3
				c7.3,8.3,19.1,11,29.3,6.6c10.2-4.4,16.3-14.8,15.3-25.9s-9.1-20.1-19.9-22.5l-12.8-25.6c9-9.2,9.8-23.6,1.8-33.7
				c-8-10.1-22.2-12.7-33.2-6l-14.3-11.9c1.1-2.8,1.6-5.8,1.7-8.9c0-10.5-6.3-19.9-16-23.8c-9.7-3.9-20.8-1.5-28,6.1L294.5,54
				c-3-11-13-18.6-24.4-18.7s-21.4,7.4-24.6,18.4l-33.8,6.8c-8.8-9.5-23.4-10.9-33.8-3.2c-10.4,7.7-13.4,22-6.9,33.2l-16.6,22.1
				c-11.9,2.1-20.6,12.3-21,24.4s7.8,22.7,19.5,25.6l13.7,33.8c-7.5,7.4-9.7,18.6-5.6,28.3c4.1,9.7,13.8,15.8,24.3,15.5
				s19.8-7.1,23.3-17.1h45.8c3.8,11.8,15.8,18.9,27.9,16.7l28.3,43.1c-7.3,8.1-8.6,19.8-3.4,29.4c5.2,9.5,15.9,14.7,26.6,12.9
				s19.1-10.1,21-20.8l21.1-16.9c4,2.5,8.7,3.9,13.4,3.9C402.6,291.3,413.7,281.2,414.9,268.1z M415,180.4c4.3,0,7.9,3.1,8.5,7.4
				c0.6,4.2-2,8.2-6.2,9.4s-8.4-0.9-10.1-4.8c0-0.1,0-0.2,0-0.2l-0.1-0.1c-0.4-1-0.6-2-0.6-3.1C406.5,184.2,410.3,180.4,415,180.4z
				 M381,118.9c0.8-4,4.3-6.8,8.4-6.8c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5c-1.1,0-2.1-0.2-3.1-0.6l-0.1,0c-0.1,0-0.2,0-0.2,0
				C382.3,126.8,380.2,122.9,381,118.9z M372.6,139.8L372.6,139.8l-15.8,39.4l-27.6-22.1c3.8-3.2,6.5-7.4,7.9-12.1l33.8-6.8
				C371.4,138.7,372,139.2,372.6,139.8z M363.5,208.3c-1.1,4.1-5.2,6.7-9.4,6.1c-4.2-0.6-7.4-4.2-7.4-8.5c0-4.7,3.8-8.5,8.5-8.5
				c1.1,0,2.1,0.2,3.1,0.6l0.1,0c0.1,0,0.2,0,0.2,0C362.6,199.8,364.6,204.2,363.5,208.3z M338.2,69.4c4.7,0,8.5,3.8,8.5,8.5
				s-3.8,8.5-8.5,8.5s-8.5-3.8-8.5-8.5C329.7,73.2,333.5,69.4,338.2,69.4z M293.3,71.3l19.5,4.9c0,0.6-0.2,1.2-0.2,1.8
				c0,14.1,11.5,25.6,25.6,25.6c4.6,0,9.1-1.3,13-3.7l14.3,11.9c-1.1,2.8-1.6,5.8-1.7,8.9c0,0.5,0.1,1,0.2,1.5l-27.8,5.6
				c-3.5-8.1-10.9-13.9-19.6-15.2l-31.2-31.2C288.8,78.6,291.5,75.2,293.3,71.3z M321.1,137.7c0,4.7-3.8,8.5-8.5,8.5
				c-4.7,0-8.5-3.8-8.5-8.5c0-4.7,3.8-8.5,8.5-8.5S321.1,133,321.1,137.7z M269.9,52.4c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5
				s-8.5-3.8-8.5-8.5C261.4,56.2,265.2,52.4,269.9,52.4z M271.6,91.7l25.6,25.6c-4,3-7,7.1-8.7,11.8h-20.2c-2-5.7-6-10.4-11.1-13.5
				L271.6,91.7z M218.6,76.4l27.8-5.6c2.2,5,5.9,9.2,10.7,12l-15.5,25.8l-26.8-17.2c2.6-4.1,4-8.8,4-13.6
				C218.7,77.4,218.6,77,218.6,76.4z M252.9,137.7c0,4.7-3.8,8.5-8.5,8.5c-4.7,0-8.5-3.8-8.5-8.5c0-4.7,3.8-8.5,8.5-8.5
				S252.9,133,252.9,137.7z M193.1,69.4c4.7,0,8.5,3.8,8.5,8.5s-3.8,8.5-8.5,8.5s-8.5-3.8-8.5-8.5C184.6,73.2,188.4,69.4,193.1,69.4
				z M183.8,101.8c5.2,2.1,11,2.4,16.3,0.7l26.3,16.9c-2.8,2.7-4.9,6.1-6.2,9.8H183c-1.9-5.3-5.4-9.8-10.1-12.9L183.8,101.8z
				 M159,146.2c-4.7,0-8.5-3.8-8.5-8.5c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5S163.7,146.2,159,146.2z M184.6,223
				c-4.7,0-8.5-3.8-8.5-8.5c0-4.7,3.8-8.5,8.5-8.5s8.5,3.8,8.5,8.5C193.1,219.2,189.3,223,184.6,223z M189.5,189.4
				c-1.6-0.3-3.2-0.5-4.9-0.5c-0.8,0-1.6,0.2-2.5,0.3l-11.6-28.7c5.8-3,10.3-8,12.5-14.2h37.3c1.5,4.3,4.2,8.1,7.7,11L189.5,189.4z
				 M254.4,206h-45.8c-0.9-2.6-2.2-4.9-3.9-7.1l41.9-34.9l14.3,32C258,198.7,255.8,202.2,254.4,206z M268.4,146.2h20.2
				c2,5.6,6,10.4,11.1,13.5L282,189.2c-1.2-0.2-2.3-0.3-3.5-0.4c-0.7,0-1.3,0.1-1.9,0.2l-14.6-32.9C264.8,153.5,267,150,268.4,146.2
				z M278.5,223c-4.7,0-8.5-3.8-8.5-8.5c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5C287,219.2,283.2,223,278.5,223z M314.9,167.5
				l23.8,19.1c-3.7,3.2-6.5,7.4-7.9,12.1l-28.8,5.8c-1.2-2.7-2.8-5.2-4.9-7.4L314.9,167.5z M329.7,308.4c-4.7,0-8.5-3.8-8.5-8.5
				s3.8-8.5,8.5-8.5s8.5,3.8,8.5,8.5C338.2,304.5,334.4,308.4,329.7,308.4z M363.8,265.7c0,2.9,0.5,5.7,1.5,8.4l-14.4,11.5
				c-5.4-8.4-15.3-12.7-25.1-10.9l-28.3-43.1c2.5-2.8,4.4-6.2,5.5-9.8l28.8-5.8c5.5,13,20.4,19.1,33.4,13.6l10.5,14.6
				C368.3,248.8,363.8,257,363.8,265.7z M372.1,186.8l16.3-40.7c0.3,0,0.7,0.1,1,0.1c1,0,2.1-0.1,3.1-0.3l10.3,20.6
				c-8.2,4.4-13.4,13-13.4,22.4c0,0.3,0.1,0.7,0.1,1l-11.5,4.6C376.6,191.6,374.6,189,372.1,186.8z M389.4,274.2
				c-4.7,0-8.5-3.8-8.5-8.5c0-4.7,3.8-8.5,8.5-8.5c4.7,0,8.5,3.8,8.5,8.5S394.1,274.2,389.4,274.2z"/>
                    </g>
                  </svg>
                  <p><strong>Developed by the best brains of world with intent to make AI accessible </strong></p>
                </li>
                <li>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 512 512" height="170" width="170" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve">

<path fill="#5F6CB0" d="M488,432h-24V200c0-13.2-10.8-24-24-24h-32v-20.3l85.2-72.3c3.4-2.9,3.8-7.9,0.9-11.3c-1.1-1.3-2.6-2.2-4.3-2.6
	l-232-53.3c-1.2-0.3-2.4-0.3-3.6,0l-232,53.3c-4.3,1-7,5.3-6,9.6c0.4,1.7,1.3,3.2,2.6,4.3L48,108.2V209c-17.1,4.4-27.4,21.9-23,39
	c2.9,11.3,11.7,20.1,23,23v161H24c-4.4,0-8,3.6-8,8v16c0,22.1,17.9,40,40,40h400c22.1,0,40-17.9,40-40v-16
	C496,435.6,492.4,432,488,432z M448,200v232h-16V216c0-4.4-3.6-8-8-8H88c-4.4,0-8,3.6-8,8v2.9c-4.2-4.8-9.8-8.2-16-9.9v-9
	c0-4.4,3.6-8,8-8h368C444.4,192,448,195.6,448,200z M416,432H96V224h320V432z M392,141.2c-22.8-6.7-79-21.2-136-21.2
	s-113.2,14.5-136,21.2v-23.3c18-5.4,77.3-21.9,136-21.9c58.6,0,118,16.5,136,21.9V141.2z M120,176v-18.1c18-5.4,77.3-21.9,136-21.9
	c58.6,0,118,16.5,136,21.9V176H120z M256,32.2l214.7,49.3L408,134.7V112c0-3.4-2.2-6.5-5.5-7.6c-3-1-74.1-24.4-146.5-24.4
	s-143.5,23.4-146.5,24.4c-3.3,1.1-5.5,4.1-5.5,7.6v22.7L41.3,81.6L256,32.2z M104,155.7V176H72c-2.7,0-5.4,0.5-8,1.4v-55.6
	L104,155.7z M40,240c0-8.8,7.2-16,16-16s16,7.2,16,16s-7.2,16-16,16C47.2,256,40,248.8,40,240z M64,271c6.2-1.6,11.8-5,16-9.9V432
	H64V271z M480,456c0,13.2-10.8,24-24,24H56c-13.2,0-24-10.8-24-24v-8h448V456z"/>
<path fill="#5F6CB0" d="M136,272h16c4.4,0,8-3.6,8-8s-3.6-8-8-8h-16c-4.4,0-8,3.6-8,8S131.6,272,136,272z"/>
<path fill="#5F6CB0" d="M184,272h128c4.4,0,8-3.6,8-8s-3.6-8-8-8H184c-4.4,0-8,3.6-8,8S179.6,272,184,272z"/>
<path fill="#5F6CB0" d="M344,272h32c4.4,0,8-3.6,8-8s-3.6-8-8-8h-32c-4.4,0-8,3.6-8,8S339.6,272,344,272z"/>
<path fill="#5F6CB0" d="M136,400h88c4.4,0,8-3.6,8-8s-3.6-8-8-8h-88c-4.4,0-8,3.6-8,8S131.6,400,136,400z"/>
<path fill="#5F6CB0" d="M336,384h-80c-4.4,0-8,3.6-8,8s3.6,8,8,8h80c4.4,0,8-3.6,8-8S340.4,384,336,384z"/>
<path fill="#5F6CB0" d="M376,288H272c-4.4,0-8,3.6-8,8s3.6,8,8,8h104c4.4,0,8-3.6,8-8S380.4,288,376,288z"/>
<path fill="#5F6CB0" d="M208,288c-4.4,0-8,3.6-8,8s3.6,8,8,8h32c4.4,0,8-3.6,8-8s-3.6-8-8-8H208z"/>
<path fill="#5F6CB0" d="M136,304h40c4.4,0,8-3.6,8-8s-3.6-8-8-8h-40c-4.4,0-8,3.6-8,8S131.6,304,136,304z"/>
<path fill="#5F6CB0" d="M376,352H208c-4.4,0-8,3.6-8,8s3.6,8,8,8h168c4.4,0,8-3.6,8-8S380.4,352,376,352z"/>
<path fill="#5F6CB0" d="M136,368h40c4.4,0,8-3.6,8-8s-3.6-8-8-8h-40c-4.4,0-8,3.6-8,8S131.6,368,136,368z"/>
<path fill="#5F6CB0" d="M136,336h144c4.4,0,8-3.6,8-8s-3.6-8-8-8H136c-4.4,0-8,3.6-8,8S131.6,336,136,336z"/>
<path fill="#5F6CB0" d="M344,336c4.4,0,8-3.6,8-8s-3.6-8-8-8h-32c-4.4,0-8,3.6-8,8s3.6,8,8,8H344z"/>
<circle fill="#5F6CB0" cx="376" cy="328" r="8"/>
</svg>

                  <p><strong>Our tool is always free for Academic research </strong></p>
                </li>
              </ul>
            </section>
            <section class="get-feedback" style={{ marginTop: 100 }}>
              <h2 class="section__title get-feedback__title">
                Construct your Machine Learning pipeline with Powerful APIs
        </h2>
              <p>
                Stream data into Image Annotator and push labeled data into training environments.
                Connect your ML models to supercharge labeling productivity and orchestrate active learning.
                Image Annotator is API-first so you can use it as infrastructure to scale up.
        </p>
            </section>
            <section class="get-feedback_" style={{ marginTop: '2%' }}>

              <p>
                <Button color="primary" size="lg" block onClick={this.updateContent1}>Import Data Row</Button>
                <Button color="primary" size="lg" block onClick={this.updateContent2}>Import Labels</Button>
                <Button color="primary" size="lg" block onClick={this.updateContent3}>Import Model Prediction</Button>
                <Button color="primary" size="lg" block onClick={this.updateContent4}>Export Label</Button>
              </p>
              <div class="intro__illustration" style={{ backgroundColor: '#25313A', width: '75%', height: '100%', display: 'flex', borderRadius: '1%', padding: '5%' }}>
                <code className="display-linebreak" style={{ color: 'white', fontWeight: 700, fontSize: 20 }}>
                  <span style={{ color: '#4f8ff0' }}>{this.state.importColor}</span>
                  <span>{this.state.message}</span>
                  <span style={{ color: '#f09178' }}>{this.state.linkColor}</span>
                  <span>{this.state.message1}</span>
                  <span style={{ color: '#f09178' }}>{this.state.message2}</span>
                  <span>{this.state.message3}</span>
                  <span style={{ color: '#f09178' }}>{this.state.message4}</span>
                  <span>{this.state.message5}</span>
                  <span style={{ color: '#f09178' }}>{this.state.message6}</span>
                  <span>{this.state.message7}</span>
                  <span style={{ color: '#f09178' }}>{this.state.message8}</span>
                  <span>{this.state.message9}</span>
                  <span style={{ color: '#f09178' }}>{this.state.message10}</span>

                </code>

              </div>
            </section>
          </main>
        </div>
        <footer class="footer">
          <div class="footer-container">
            <center><h3 class="footer-title">An initiative by <a href="https://edunomics.in" target="_blank"> Edunomics</a> to make AI accessible</h3></center>
            <div>
              <center><h3 class="footer-title">Visit <a href="" target="_blank" style={{ textDecoration: 'none', color: 'black' }}>www.edunomics.in</a></h3></center>
              <center><a href="https://www.facebook.com/edunomics2020/" target="_blank" style={{ marginRight: 7 }}><i class="fab fa-facebook fa-2x"></i></a>
                <a href="https://www.instagram.com/edunomics2020/" target="_blank" style={{ marginRight: 7 }}><i class="fab fa-instagram fa-2x"></i></a>
                <a href="https://www.linkedin.com/company/edunomics/" target="_blank" style={{ marginRight: 7 }}><i class="fab fa-linkedin fa-2x"></i></a>
                <a href="https://twitter.com/Edunomics2" target="_blank"><i class="fab fa-twitter fa-2x"></i></a></center>
            </div>
            <p class="copyright"><small>&copy; Edunomics 2020. All Rights Reserved</small></p>
          </div>

        </footer>
      </Fragment>

    )
  }
}


export default Start;