import React, { Fragment } from 'react';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
import './Start.css';
import {
  Link,
} from "react-router-dom";

class Start extends React.Component {
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


  render() {
    return (
      <Fragment>
        <header id="header" class="header">
          <Link to ='/'>
          <img src="https://res.cloudinary.com/alexandracaulea/image/upload/v1583497208/logo_i5t9wh.svg" class="logo" alt="Edunomics" id="header-img" />
          </Link>
          <nav id="nav-bar" class="nav">
            <ul class="nav-list">
              {/* <li class="nav-item">
                <a class="nav-link" href="#">Features</a>
              </li> */}
              <li class="nav-item ">
                <Link to ='/signin' class="nav-link">
                Login
                </Link>
              </li>
              <li class="nav-item">
                <Link to ='/signin' class="nav-link">
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
        <div style={{marginTop:'80px'}}>
        <main>
          <section class="intro">
            <h1 class="intro__title">
              Image Annotation
        </h1>
            <p className="intro__subtitle">
              Data is the fuel to AI and for the same . . . .
              AI starts with quality data with good annotation,
        High quality training and validation data for AI applications</p>
            {/* <a href="#" class="button">Get Started</a> */}
            <img class="intro__illustration" src="https://res.cloudinary.com/alexandracaulea/image/upload/v1583497233/intro-illustration_qneuer.svg" alt="" />
          </section>


          <section id="features" class="features">
            <h2 class="visuallyhidden">Features</h2>
            <ul class="features__list">
              <li>
                <svg width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M54 115c29.271 0 53-23.505 53-52.5S83.271 10 54 10 1 33.505 1 62.5 24.729 115 54 115z" fill="#F2F2F2" />
                  <path d="M58 116c-.612 0-1.23-.01-1.837-.029l.014-.44c.871.027 1.76.034 2.636.022l.006.441c-.273.004-.546.006-.819.006zm3.472-.102l-.026-.441a57.812 57.812 0 002.627-.214l.046.438c-.877.092-1.767.165-2.647.217zm-7.96-.069a58.196 58.196 0 01-2.642-.263l.053-.438c.867.107 1.75.194 2.623.261l-.034.44zm13.24-.485l-.066-.436c.867-.131 1.74-.284 2.596-.454l.086.432a56.77 56.77 0 01-2.615.458zm-18.51-.161a59.032 59.032 0 01-2.607-.504l.093-.431a56.73 56.73 0 002.588.5l-.074.435zm23.718-.874l-.106-.428c.851-.211 1.707-.443 2.543-.691l.126.423c-.843.25-1.706.484-2.563.696zm-28.906-.253a57.235 57.235 0 01-2.55-.742l.133-.42c.833.263 1.684.511 2.53.736l-.114.426zm33.996-1.257l-.144-.417a57.617 57.617 0 002.468-.922l.164.409c-.819.328-1.655.641-2.488.93zm-39.066-.346a56.2 56.2 0 01-2.476-.976l.171-.406a57.9 57.9 0 002.457.968l-.152.414zm43.99-1.625l-.182-.401c.793-.36 1.59-.745 2.37-1.143l.2.393c-.785.401-1.588.788-2.387 1.151zm-48.894-.439a59.598 59.598 0 01-2.374-1.199l.208-.389c.774.413 1.566.813 2.356 1.19l-.19.398zm53.614-1.973l-.219-.383c.76-.434 1.52-.89 2.256-1.356l.236.373c-.742.469-1.507.929-2.273 1.366zm-58.304-.533a57.96 57.96 0 01-2.253-1.411l.243-.369c.732.483 1.485.954 2.236 1.401l-.226.379zm62.786-2.302l-.253-.362c.716-.5 1.43-1.024 2.124-1.557l.269.35a58.214 58.214 0 01-2.14 1.569zm-67.224-.621a57.961 57.961 0 01-2.114-1.611l.275-.344a58.378 58.378 0 002.098 1.598l-.26.357zm71.43-2.613l-.284-.337a58.545 58.545 0 001.975-1.744l.3.323a57.973 57.973 0 01-1.99 1.758zm-75.582-.702a58.933 58.933 0 01-1.957-1.795l.305-.319a58.212 58.212 0 001.943 1.782l-.29.332zm79.48-2.903l-.314-.31a58.693 58.693 0 001.809-1.917l.328.295a59.303 59.303 0 01-1.823 1.932zm-83.31-.774c-.61-.64-1.21-1.301-1.787-1.965l.334-.29c.572.66 1.168 1.316 1.772 1.95l-.32.305zm86.865-3.171l-.34-.28a58.938 58.938 0 001.627-2.075l.353.264a58.33 58.33 0 01-1.64 2.09zm-90.345-.838a58.08 58.08 0 01-1.6-2.118l.359-.257a58.04 58.04 0 001.586 2.102l-.345.273zm93.527-3.417l-.365-.248a57.38 57.38 0 001.432-2.216l.376.231a58.1 58.1 0 01-1.443 2.233zm-96.626-.889c-.48-.737-.951-1.495-1.398-2.254l.38-.224c.443.753.91 1.506 1.387 2.237l-.37.241zm99.408-3.641l-.386-.213c.424-.767.835-1.553 1.223-2.34l.396.196a57.545 57.545 0 01-1.233 2.357zm-102.1-.927a58.053 58.053 0 01-1.185-2.371l.399-.188c.372.79.768 1.58 1.176 2.352l-.39.207zm104.456-3.841l-.404-.177a57.8 57.8 0 001.003-2.443l.412.158a58.596 58.596 0 01-1.011 2.462zM4.439 80.292a57.874 57.874 0 01-.963-2.468l.415-.15c.298.82.62 1.643.955 2.448l-.407.17zm108.623-4.017l-.419-.139c.276-.83.535-1.677.772-2.52l.425.12c-.239.849-.501 1.703-.778 2.539zM2.627 75.308a57.93 57.93 0 01-.733-2.552l.426-.112c.223.847.467 1.699.728 2.533l-.421.131zM114.5 71.163l-.43-.1c.197-.85.378-1.718.537-2.58l.433.08a56.648 56.648 0 01-.54 2.6zm-113.22-.99a58.018 58.018 0 01-.495-2.61l.435-.072c.143.864.308 1.734.491 2.59l-.431.091zm114.181-4.231l-.437-.06c.118-.864.218-1.745.297-2.618l.44.04a58.96 58.96 0 01-.3 2.638zM.411 64.935a58.662 58.662 0 01-.255-2.643l.44-.033c.064.875.15 1.757.252 2.624l-.438.052zm115.529-4.28l-.44-.02c.039-.874.059-1.76.059-2.635H116c0 .88-.02 1.774-.06 2.654zM.023 59.638a59.528 59.528 0 01-.014-2.655l.44.007a58.207 58.207 0 00.015 2.636l-.441.012zm115.533-2.254a59.395 59.395 0 00-.087-2.635l.44-.024c.049.88.079 1.773.088 2.654l-.441.005zM.554 54.358l-.44-.027c.055-.882.131-1.772.226-2.646l.438.048a58.23 58.23 0 00-.224 2.625zm114.709-2.235c-.088-.87-.198-1.749-.326-2.615l.436-.064c.129.872.24 1.759.329 2.635l-.439.044zM1.122 49.12l-.436-.067c.135-.873.292-1.752.467-2.615l.432.088a57.517 57.517 0 00-.463 2.594zm113.37-2.209a58.142 58.142 0 00-.564-2.574l.428-.104c.208.854.399 1.727.569 2.594l-.433.084zM2.167 43.956l-.428-.107c.214-.855.451-1.716.705-2.56l.422.126a57.56 57.56 0 00-.7 2.54zm111.078-2.164a56.235 56.235 0 00-.799-2.511l.417-.144c.287.833.558 1.684.806 2.53l-.424.125zm-109.56-2.89l-.416-.146c.293-.833.61-1.671.94-2.49l.41.166a57.242 57.242 0 00-.934 2.47zm107.848-2.093a58.113 58.113 0 00-1.025-2.422l.403-.18c.36.8.707 1.621 1.032 2.44l-.41.162zM5.664 34.007l-.4-.184a58.01 58.01 0 011.165-2.39l.392.201c-.402.779-.79 1.577-1.157 2.373zm103.71-1.992a58.155 58.155 0 00-1.243-2.32l.384-.216a59.04 59.04 0 011.252 2.336l-.393.2zM8.085 29.318l-.382-.22a58.29 58.29 0 011.38-2.273l.37.237a57.735 57.735 0 00-1.368 2.256zm98.698-1.883a57.411 57.411 0 00-1.451-2.196l.362-.252c.501.722.993 1.466 1.462 2.214l-.373.235zm-95.859-2.563l-.36-.254c.508-.721 1.04-1.44 1.58-2.136l.349.27a58.06 58.06 0 00-1.569 2.12zm92.858-1.762a58.165 58.165 0 00-1.645-2.057l.338-.284a58.972 58.972 0 011.658 2.073l-.351.268zm-89.626-2.404l-.336-.286c.57-.67 1.165-1.337 1.768-1.983l.322.301a58.522 58.522 0 00-1.754 1.968zm86.243-1.634a57.893 57.893 0 00-1.826-1.9l.31-.312c.625.62 1.244 1.264 1.841 1.914l-.325.298zm-82.648-2.22l-.308-.314a58.36 58.36 0 011.94-1.813l.294.329c-.652.581-1.3 1.187-1.925 1.799zm78.91-1.494c-.648-.59-1.319-1.17-1.992-1.727l.282-.34c.677.561 1.353 1.146 2.007 1.74l-.296.327zm-74.98-2.014l-.279-.342a58.672 58.672 0 012.096-1.629l.263.355a58.224 58.224 0 00-2.08 1.616zm70.92-1.347a58.448 58.448 0 00-2.143-1.538l.249-.364a58.521 58.521 0 012.158 1.55l-.265.352zm-66.69-1.789l-.246-.365c.73-.492 1.482-.973 2.234-1.43l.23.376c-.747.455-1.493.932-2.218 1.42zM88.247 9.02a57.794 57.794 0 00-2.275-1.337l.214-.386c.77.43 1.542.883 2.293 1.347l-.232.376zm-57.84-1.546l-.211-.387a58.279 58.279 0 012.354-1.22l.193.397c-.783.383-1.569.79-2.336 1.21zm53.23-1.022a57.677 57.677 0 00-2.39-1.123l.18-.403c.806.356 1.616.737 2.407 1.13l-.197.396zm-48.505-1.29l-.176-.404c.807-.35 1.633-.685 2.454-.997l.157.412a57.38 57.38 0 00-2.435.99zm43.676-.845a57.383 57.383 0 00-2.484-.898l.14-.418c.839.281 1.68.586 2.504.905l-.16.411zM40.051 3.295l-.137-.42a57.699 57.699 0 012.542-.768l.118.425c-.842.233-1.69.49-2.523.763zm33.756-.656c-.841-.24-1.7-.463-2.55-.664l.1-.43c.859.203 1.723.428 2.57.67l-.12.424zm-28.678-.753l-.099-.43c.86-.197 1.735-.376 2.602-.532l.078.434c-.86.155-1.729.333-2.581.528zm23.55-.456a57.53 57.53 0 00-2.6-.427l.06-.436c.874.122 1.755.267 2.621.43l-.081.433zM50.314.95l-.059-.437a58.223 58.223 0 012.64-.291l.038.44c-.872.075-1.753.172-2.62.288zM63.46.697A58.036 58.036 0 0060.833.51l.021-.441a58.62 58.62 0 012.648.189l-.041.439zM55.563.492l-.019-.44C56.354.016 57.181 0 58 0h.2l-.002.441H58c-.813 0-1.633.017-2.437.05z" fill="#3F3D56" />
                  <path d="M80.047 63.675h3.017a6.409 6.409 0 016.409 6.41v.7a6.41 6.41 0 01-6.41 6.409h-3.016V63.675z" fill="#5F6CAF" />
                  <path d="M79.303 61.443h2.728a2.728 2.728 0 012.729 2.728v12.527a2.728 2.728 0 01-2.729 2.728h-2.728V61.443zM35.426 77.194h-3.017A6.409 6.409 0 0126 70.784v-.7a6.409 6.409 0 016.41-6.409h3.016v13.519z" fill="#5F6CAF" />
                  <path d="M36.17 79.426H33.44a2.729 2.729 0 01-2.728-2.728V64.17a2.729 2.729 0 012.728-2.728h2.729v17.983z" fill="#5F6CAF" />
                  <path d="M83.272 64.616h-2C81.272 50.491 70.806 39 57.942 39 45.077 39 34.61 50.491 34.61 64.616h-2C32.61 49.39 43.974 37 57.94 37c13.968 0 25.331 12.389 25.331 27.616z" fill="#5F6CAF" />

                </svg>
                <p><strong>Annotation - Let Edunomics bring the best of DATA Platform for AI</strong></p>
              </li>
              <li>
                <svg width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M54 115c29.271 0 53-23.505 53-52.5S83.271 10 54 10 1 33.505 1 62.5 24.729 115 54 115z" fill="#F2F2F2" />
                  <path d="M58 116c-.612 0-1.23-.01-1.837-.029l.014-.44c.871.027 1.76.034 2.636.022l.006.441c-.273.004-.546.006-.819.006zm3.472-.102l-.026-.441a57.812 57.812 0 002.627-.214l.046.438c-.877.092-1.767.165-2.647.217zm-7.96-.069a58.196 58.196 0 01-2.642-.263l.053-.438c.867.107 1.75.194 2.623.261l-.034.44zm13.24-.485l-.066-.436c.867-.131 1.74-.284 2.596-.454l.086.432a56.77 56.77 0 01-2.615.458zm-18.51-.161a59.032 59.032 0 01-2.607-.504l.093-.431a56.73 56.73 0 002.588.5l-.074.435zm23.718-.874l-.106-.428c.851-.211 1.707-.443 2.543-.691l.126.423c-.843.25-1.706.484-2.563.696zm-28.906-.253a57.235 57.235 0 01-2.55-.742l.133-.42c.833.263 1.684.511 2.53.736l-.114.426zm33.996-1.257l-.144-.417a57.617 57.617 0 002.468-.922l.164.409c-.819.328-1.655.641-2.488.93zm-39.066-.346a56.2 56.2 0 01-2.476-.976l.171-.406a57.9 57.9 0 002.457.968l-.152.414zm43.99-1.625l-.182-.401c.793-.36 1.59-.745 2.37-1.143l.2.393c-.785.401-1.588.788-2.387 1.151zm-48.894-.439a59.598 59.598 0 01-2.374-1.199l.208-.389c.774.413 1.566.813 2.356 1.19l-.19.398zm53.614-1.973l-.219-.383c.76-.434 1.52-.89 2.256-1.356l.236.373c-.742.469-1.507.929-2.273 1.366zm-58.304-.533a57.96 57.96 0 01-2.253-1.411l.243-.369c.732.483 1.485.954 2.236 1.401l-.226.379zm62.786-2.302l-.253-.362c.716-.5 1.43-1.024 2.124-1.557l.269.35a58.214 58.214 0 01-2.14 1.569zm-67.224-.621a57.961 57.961 0 01-2.114-1.611l.275-.344a58.378 58.378 0 002.098 1.598l-.26.357zm71.43-2.613l-.284-.337a58.545 58.545 0 001.975-1.744l.3.323a57.973 57.973 0 01-1.99 1.758zm-75.582-.702a58.933 58.933 0 01-1.957-1.795l.305-.319a58.212 58.212 0 001.943 1.782l-.29.332zm79.48-2.903l-.314-.31a58.693 58.693 0 001.809-1.917l.328.295a59.303 59.303 0 01-1.823 1.932zm-83.31-.774c-.61-.64-1.21-1.301-1.787-1.965l.334-.29c.572.66 1.168 1.316 1.772 1.95l-.32.305zm86.865-3.171l-.34-.28a58.938 58.938 0 001.627-2.075l.353.264a58.33 58.33 0 01-1.64 2.09zm-90.345-.838a58.08 58.08 0 01-1.6-2.118l.359-.257a58.04 58.04 0 001.586 2.102l-.345.273zm93.527-3.417l-.365-.248a57.38 57.38 0 001.432-2.216l.376.231a58.1 58.1 0 01-1.443 2.233zm-96.626-.889c-.48-.737-.951-1.495-1.398-2.254l.38-.224c.443.753.91 1.506 1.387 2.237l-.37.241zm99.408-3.641l-.386-.213c.424-.767.835-1.553 1.223-2.34l.396.196a57.545 57.545 0 01-1.233 2.357zm-102.1-.927a58.053 58.053 0 01-1.185-2.371l.399-.188c.372.79.768 1.58 1.176 2.352l-.39.207zm104.456-3.841l-.404-.177a57.8 57.8 0 001.003-2.443l.412.158a58.596 58.596 0 01-1.011 2.462zM4.439 80.292a57.874 57.874 0 01-.963-2.468l.415-.15c.298.82.62 1.643.955 2.448l-.407.17zm108.623-4.017l-.419-.139c.276-.83.535-1.677.772-2.52l.425.12c-.239.849-.501 1.703-.778 2.539zM2.627 75.308a57.93 57.93 0 01-.733-2.552l.426-.112c.223.847.467 1.699.728 2.533l-.421.131zM114.5 71.163l-.43-.1c.197-.85.378-1.718.537-2.58l.433.08a56.648 56.648 0 01-.54 2.6zm-113.22-.99a58.018 58.018 0 01-.495-2.61l.435-.072c.143.864.308 1.734.491 2.59l-.431.091zm114.181-4.231l-.437-.06c.118-.864.218-1.745.297-2.618l.44.04a58.96 58.96 0 01-.3 2.638zM.411 64.935a58.662 58.662 0 01-.255-2.643l.44-.033c.064.875.15 1.757.252 2.624l-.438.052zm115.529-4.28l-.44-.02c.039-.874.059-1.76.059-2.635H116c0 .88-.02 1.774-.06 2.654zM.023 59.638a59.528 59.528 0 01-.014-2.655l.44.007a58.207 58.207 0 00.015 2.636l-.441.012zm115.533-2.254a59.395 59.395 0 00-.087-2.635l.44-.024c.049.88.079 1.773.088 2.654l-.441.005zM.554 54.358l-.44-.027c.055-.882.131-1.772.226-2.646l.438.048a58.23 58.23 0 00-.224 2.625zm114.709-2.235c-.088-.87-.198-1.749-.326-2.615l.436-.064c.129.872.24 1.759.329 2.635l-.439.044zM1.122 49.12l-.436-.067c.135-.873.292-1.752.467-2.615l.432.088a57.517 57.517 0 00-.463 2.594zm113.37-2.209a58.142 58.142 0 00-.564-2.574l.428-.104c.208.854.399 1.727.569 2.594l-.433.084zM2.167 43.956l-.428-.107c.214-.855.451-1.716.705-2.56l.422.126a57.56 57.56 0 00-.7 2.54zm111.078-2.164a56.235 56.235 0 00-.799-2.511l.417-.144c.287.833.558 1.684.806 2.53l-.424.125zm-109.56-2.89l-.416-.146c.293-.833.61-1.671.94-2.49l.41.166a57.242 57.242 0 00-.934 2.47zm107.848-2.093a58.113 58.113 0 00-1.025-2.422l.403-.18c.36.8.707 1.621 1.032 2.44l-.41.162zM5.664 34.007l-.4-.184a58.01 58.01 0 011.165-2.39l.392.201c-.402.779-.79 1.577-1.157 2.373zm103.71-1.992a58.155 58.155 0 00-1.243-2.32l.384-.216a59.04 59.04 0 011.252 2.336l-.393.2zM8.085 29.318l-.382-.22a58.29 58.29 0 011.38-2.273l.37.237a57.735 57.735 0 00-1.368 2.256zm98.698-1.883a57.411 57.411 0 00-1.451-2.196l.362-.252c.501.722.993 1.466 1.462 2.214l-.373.235zm-95.859-2.563l-.36-.254c.508-.721 1.04-1.44 1.58-2.136l.349.27a58.06 58.06 0 00-1.569 2.12zm92.858-1.762a58.165 58.165 0 00-1.645-2.057l.338-.284a58.972 58.972 0 011.658 2.073l-.351.268zm-89.626-2.404l-.336-.286c.57-.67 1.165-1.337 1.768-1.983l.322.301a58.522 58.522 0 00-1.754 1.968zm86.243-1.634a57.893 57.893 0 00-1.826-1.9l.31-.312c.625.62 1.244 1.264 1.841 1.914l-.325.298zm-82.648-2.22l-.308-.314a58.36 58.36 0 011.94-1.813l.294.329c-.652.581-1.3 1.187-1.925 1.799zm78.91-1.494c-.648-.59-1.319-1.17-1.992-1.727l.282-.34c.677.561 1.353 1.146 2.007 1.74l-.296.327zm-74.98-2.014l-.279-.342a58.672 58.672 0 012.096-1.629l.263.355a58.224 58.224 0 00-2.08 1.616zm70.92-1.347a58.448 58.448 0 00-2.143-1.538l.249-.364a58.521 58.521 0 012.158 1.55l-.265.352zm-66.69-1.789l-.246-.365c.73-.492 1.482-.973 2.234-1.43l.23.376c-.747.455-1.493.932-2.218 1.42zM88.247 9.02a57.794 57.794 0 00-2.275-1.337l.214-.386c.77.43 1.542.883 2.293 1.347l-.232.376zm-57.84-1.546l-.211-.387a58.279 58.279 0 012.354-1.22l.193.397c-.783.383-1.569.79-2.336 1.21zm53.23-1.022a57.677 57.677 0 00-2.39-1.123l.18-.403c.806.356 1.616.737 2.407 1.13l-.197.396zm-48.505-1.29l-.176-.404c.807-.35 1.633-.685 2.454-.997l.157.412a57.38 57.38 0 00-2.435.99zm43.676-.845a57.383 57.383 0 00-2.484-.898l.14-.418c.839.281 1.68.586 2.504.905l-.16.411zM40.051 3.295l-.137-.42a57.699 57.699 0 012.542-.768l.118.425c-.842.233-1.69.49-2.523.763zm33.756-.656c-.841-.24-1.7-.463-2.55-.664l.1-.43c.859.203 1.723.428 2.57.67l-.12.424zm-28.678-.753l-.099-.43c.86-.197 1.735-.376 2.602-.532l.078.434c-.86.155-1.729.333-2.581.528zm23.55-.456a57.53 57.53 0 00-2.6-.427l.06-.436c.874.122 1.755.267 2.621.43l-.081.433zM50.314.95l-.059-.437a58.223 58.223 0 012.64-.291l.038.44c-.872.075-1.753.172-2.62.288zM63.46.697A58.036 58.036 0 0060.833.51l.021-.441a58.62 58.62 0 012.648.189l-.041.439zM55.563.492l-.019-.44C56.354.016 57.181 0 58 0h.2l-.002.441H58c-.813 0-1.633.017-2.437.05z" fill="#3F3D56" />
                  <path d="M86 46.536H30.42v39.565H86V46.536z" fill="#E6E6E6" />
                  <path d="M26.113 82.333h-.403V42.768h54.638v.41H26.113v39.155z" fill="#5F6CAF" />
                  <path d="M21.403 77.623H21V39h54.638v.4H21.403v38.223z" fill="#5F6CAF" />
                  <path d="M58.21 78.565c6.503 0 11.776-5.272 11.776-11.775 0-6.504-5.273-11.776-11.776-11.776S46.435 60.286 46.435 66.79c0 6.503 5.272 11.775 11.775 11.775z" fill="#fff" />
                  <path d="M54.913 60.667v12.246l9.42-6.207-9.42-6.04z" fill="#5F6CAF" />
                </svg>
                <p><strong>Developed by the best brains of world with intent to make AI accessible </strong></p>
              </li>
              <li>
                <svg width="116" height="116" viewBox="0 0 116 116" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M54 115c29.271 0 53-23.505 53-52.5S83.271 10 54 10 1 33.505 1 62.5 24.729 115 54 115z" fill="#F2F2F2" />
                  <path d="M58 116c-.612 0-1.23-.01-1.837-.029l.014-.44c.871.027 1.76.034 2.636.022l.006.441c-.273.004-.546.006-.819.006zm3.472-.102l-.026-.441a57.812 57.812 0 002.627-.214l.046.438c-.877.092-1.767.165-2.647.217zm-7.96-.069a58.196 58.196 0 01-2.642-.263l.053-.438c.867.107 1.75.194 2.623.261l-.034.44zm13.24-.485l-.066-.436c.867-.131 1.74-.284 2.596-.454l.086.432a56.77 56.77 0 01-2.615.458zm-18.51-.161a59.032 59.032 0 01-2.607-.504l.093-.431a56.73 56.73 0 002.588.5l-.074.435zm23.718-.874l-.106-.428c.851-.211 1.707-.443 2.543-.691l.126.423c-.843.25-1.706.484-2.563.696zm-28.906-.253a57.235 57.235 0 01-2.55-.742l.133-.42c.833.263 1.684.511 2.53.736l-.114.426zm33.996-1.257l-.144-.417a57.617 57.617 0 002.468-.922l.164.409c-.819.328-1.655.641-2.488.93zm-39.066-.346a56.2 56.2 0 01-2.476-.976l.171-.406a57.9 57.9 0 002.457.968l-.152.414zm43.99-1.625l-.182-.401c.793-.36 1.59-.745 2.37-1.143l.2.393c-.785.401-1.588.788-2.387 1.151zm-48.894-.439a59.598 59.598 0 01-2.374-1.199l.208-.389c.774.413 1.566.813 2.356 1.19l-.19.398zm53.614-1.973l-.219-.383c.76-.434 1.52-.89 2.256-1.356l.236.373c-.742.469-1.507.929-2.273 1.366zm-58.304-.533a57.96 57.96 0 01-2.253-1.411l.243-.369c.732.483 1.485.954 2.236 1.401l-.226.379zm62.786-2.302l-.253-.362c.716-.5 1.43-1.024 2.124-1.557l.269.35a58.214 58.214 0 01-2.14 1.569zm-67.224-.621a57.961 57.961 0 01-2.114-1.611l.275-.344a58.378 58.378 0 002.098 1.598l-.26.357zm71.43-2.613l-.284-.337a58.545 58.545 0 001.975-1.744l.3.323a57.973 57.973 0 01-1.99 1.758zm-75.582-.702a58.933 58.933 0 01-1.957-1.795l.305-.319a58.212 58.212 0 001.943 1.782l-.29.332zm79.48-2.903l-.314-.31a58.693 58.693 0 001.809-1.917l.328.295a59.303 59.303 0 01-1.823 1.932zm-83.31-.774c-.61-.64-1.21-1.301-1.787-1.965l.334-.29c.572.66 1.168 1.316 1.772 1.95l-.32.305zm86.865-3.171l-.34-.28a58.938 58.938 0 001.627-2.075l.353.264a58.33 58.33 0 01-1.64 2.09zm-90.345-.838a58.08 58.08 0 01-1.6-2.118l.359-.257a58.04 58.04 0 001.586 2.102l-.345.273zm93.527-3.417l-.365-.248a57.38 57.38 0 001.432-2.216l.376.231a58.1 58.1 0 01-1.443 2.233zm-96.626-.889c-.48-.737-.951-1.495-1.398-2.254l.38-.224c.443.753.91 1.506 1.387 2.237l-.37.241zm99.408-3.641l-.386-.213c.424-.767.835-1.553 1.223-2.34l.396.196a57.545 57.545 0 01-1.233 2.357zm-102.1-.927a58.053 58.053 0 01-1.185-2.371l.399-.188c.372.79.768 1.58 1.176 2.352l-.39.207zm104.456-3.841l-.404-.177a57.8 57.8 0 001.003-2.443l.412.158a58.596 58.596 0 01-1.011 2.462zM4.439 80.292a57.874 57.874 0 01-.963-2.468l.415-.15c.298.82.62 1.643.955 2.448l-.407.17zm108.623-4.017l-.419-.139c.276-.83.535-1.677.772-2.52l.425.12c-.239.849-.501 1.703-.778 2.539zM2.627 75.308a57.93 57.93 0 01-.733-2.552l.426-.112c.223.847.467 1.699.728 2.533l-.421.131zM114.5 71.163l-.43-.1c.197-.85.378-1.718.537-2.58l.433.08a56.648 56.648 0 01-.54 2.6zm-113.22-.99a58.018 58.018 0 01-.495-2.61l.435-.072c.143.864.308 1.734.491 2.59l-.431.091zm114.181-4.231l-.437-.06c.118-.864.218-1.745.297-2.618l.44.04a58.96 58.96 0 01-.3 2.638zM.411 64.935a58.662 58.662 0 01-.255-2.643l.44-.033c.064.875.15 1.757.252 2.624l-.438.052zm115.529-4.28l-.44-.02c.039-.874.059-1.76.059-2.635H116c0 .88-.02 1.774-.06 2.654zM.023 59.638a59.528 59.528 0 01-.014-2.655l.44.007a58.207 58.207 0 00.015 2.636l-.441.012zm115.533-2.254a59.395 59.395 0 00-.087-2.635l.44-.024c.049.88.079 1.773.088 2.654l-.441.005zM.554 54.358l-.44-.027c.055-.882.131-1.772.226-2.646l.438.048a58.23 58.23 0 00-.224 2.625zm114.709-2.235c-.088-.87-.198-1.749-.326-2.615l.436-.064c.129.872.24 1.759.329 2.635l-.439.044zM1.122 49.12l-.436-.067c.135-.873.292-1.752.467-2.615l.432.088a57.517 57.517 0 00-.463 2.594zm113.37-2.209a58.142 58.142 0 00-.564-2.574l.428-.104c.208.854.399 1.727.569 2.594l-.433.084zM2.167 43.956l-.428-.107c.214-.855.451-1.716.705-2.56l.422.126a57.56 57.56 0 00-.7 2.54zm111.078-2.164a56.235 56.235 0 00-.799-2.511l.417-.144c.287.833.558 1.684.806 2.53l-.424.125zm-109.56-2.89l-.416-.146c.293-.833.61-1.671.94-2.49l.41.166a57.242 57.242 0 00-.934 2.47zm107.848-2.093a58.113 58.113 0 00-1.025-2.422l.403-.18c.36.8.707 1.621 1.032 2.44l-.41.162zM5.664 34.007l-.4-.184a58.01 58.01 0 011.165-2.39l.392.201c-.402.779-.79 1.577-1.157 2.373zm103.71-1.992a58.155 58.155 0 00-1.243-2.32l.384-.216a59.04 59.04 0 011.252 2.336l-.393.2zM8.085 29.318l-.382-.22a58.29 58.29 0 011.38-2.273l.37.237a57.735 57.735 0 00-1.368 2.256zm98.698-1.883a57.411 57.411 0 00-1.451-2.196l.362-.252c.501.722.993 1.466 1.462 2.214l-.373.235zm-95.859-2.563l-.36-.254c.508-.721 1.04-1.44 1.58-2.136l.349.27a58.06 58.06 0 00-1.569 2.12zm92.858-1.762a58.165 58.165 0 00-1.645-2.057l.338-.284a58.972 58.972 0 011.658 2.073l-.351.268zm-89.626-2.404l-.336-.286c.57-.67 1.165-1.337 1.768-1.983l.322.301a58.522 58.522 0 00-1.754 1.968zm86.243-1.634a57.893 57.893 0 00-1.826-1.9l.31-.312c.625.62 1.244 1.264 1.841 1.914l-.325.298zm-82.648-2.22l-.308-.314a58.36 58.36 0 011.94-1.813l.294.329c-.652.581-1.3 1.187-1.925 1.799zm78.91-1.494c-.648-.59-1.319-1.17-1.992-1.727l.282-.34c.677.561 1.353 1.146 2.007 1.74l-.296.327zm-74.98-2.014l-.279-.342a58.672 58.672 0 012.096-1.629l.263.355a58.224 58.224 0 00-2.08 1.616zm70.92-1.347a58.448 58.448 0 00-2.143-1.538l.249-.364a58.521 58.521 0 012.158 1.55l-.265.352zm-66.69-1.789l-.246-.365c.73-.492 1.482-.973 2.234-1.43l.23.376c-.747.455-1.493.932-2.218 1.42zM88.247 9.02a57.794 57.794 0 00-2.275-1.337l.214-.386c.77.43 1.542.883 2.293 1.347l-.232.376zm-57.84-1.546l-.211-.387a58.279 58.279 0 012.354-1.22l.193.397c-.783.383-1.569.79-2.336 1.21zm53.23-1.022a57.677 57.677 0 00-2.39-1.123l.18-.403c.806.356 1.616.737 2.407 1.13l-.197.396zm-48.505-1.29l-.176-.404c.807-.35 1.633-.685 2.454-.997l.157.412a57.38 57.38 0 00-2.435.99zm43.676-.845a57.383 57.383 0 00-2.484-.898l.14-.418c.839.281 1.68.586 2.504.905l-.16.411zM40.051 3.295l-.137-.42a57.699 57.699 0 012.542-.768l.118.425c-.842.233-1.69.49-2.523.763zm33.756-.656c-.841-.24-1.7-.463-2.55-.664l.1-.43c.859.203 1.723.428 2.57.67l-.12.424zm-28.678-.753l-.099-.43c.86-.197 1.735-.376 2.602-.532l.078.434c-.86.155-1.729.333-2.581.528zm23.55-.456a57.53 57.53 0 00-2.6-.427l.06-.436c.874.122 1.755.267 2.621.43l-.081.433zM50.314.95l-.059-.437a58.223 58.223 0 012.64-.291l.038.44c-.872.075-1.753.172-2.62.288zM63.46.697A58.036 58.036 0 0060.833.51l.021-.441a58.62 58.62 0 012.648.189l-.041.439zM55.563.492l-.019-.44C56.354.016 57.181 0 58 0h.2l-.002.441H58c-.813 0-1.633.017-2.437.05zM74.044 86H33.067a5.132 5.132 0 01-3.583-1.447A4.881 4.881 0 0128 81.058V62.747c0-.266.055-.53.163-.773a1.96 1.96 0 01.463-.648L50.34 41.25A4.737 4.737 0 0153.556 40c1.196 0 2.347.447 3.215 1.25l20.703 19.141c.517.479.929 1.055 1.21 1.693a5.01 5.01 0 01.427 2.021v16.953c0 1.31-.534 2.568-1.484 3.495A5.132 5.132 0 0174.044 86z" fill="#3F3D56" />
                  <path opacity=".1" d="M28 63h50.26v16.094a6.857 6.857 0 01-2.053 4.883A7.059 7.059 0 0171.252 86H35.007c-.92 0-1.831-.179-2.681-.526a7.014 7.014 0 01-2.274-1.497 6.9 6.9 0 01-1.519-2.24A6.82 6.82 0 0128 79.094V63z" fill="#000" />
                  <path d="M69.524 46.815H37.587c-1.531 0-2.772 1.27-2.772 2.835v32.663c0 1.566 1.24 2.835 2.772 2.835h31.937c1.531 0 2.772-1.27 2.772-2.835V49.65c0-1.566-1.24-2.835-2.772-2.835z" fill="#5F6CAF" />
                  <path opacity=".1" d="M72.296 63.852v21.296H34.815V63.852l18.74 9.365 18.741-9.365z" fill="#000" />
                  <path d="M53.556 73.786l-24.15-11.541a.99.99 0 00-1.284.403.96.96 0 00-.122.469v19.858a2.996 2.996 0 00.896 2.139A3.062 3.062 0 0031.06 86h44.993c.811 0 1.59-.319 2.163-.886a3.008 3.008 0 00.896-2.14V63.458a1.172 1.172 0 00-.56-1.001 1.205 1.205 0 00-1.156-.063l-23.84 11.393z" fill="#3F3D56" />
                  <path d="M48.444 50.222H37.37v1.704h11.074v-1.704zM68.037 58.74H37.37v.853h30.667v-.852zM68.037 61.296H37.37v.852h30.667v-.852z" fill="#F2F2F2" />
                  <path d="M36.093 51.926a4.685 4.685 0 100-9.37 4.685 4.685 0 000 9.37z" fill="#fff" />
                  <path d="M36.519 42.556a5.111 5.111 0 105.11 5.11 5.126 5.126 0 00-5.11-5.11zm-1.05 7.836l-2.62-2.62.736-.734 1.887 1.887 3.983-3.983.735.734-4.72 4.716z" fill="#7FCD91" />

                </svg>
                <p><strong>Our tool is always free for Academic research </strong></p>
              </li>
            </ul>
          </section>




          <section class="get-feedback">
            <h2 class="section__title get-feedback__title">
              Construct your Machine Learning pipeline with Powerful APIs
        </h2>
            <p>
              Stream data into Labelbox and push labeled data into training environments.
              Connect your ML models to supercharge labeling productivity and orchestrate active learning.
              Labelbox is API-first so you can use it as infrastructure to scale up.
        </p>
            <img class="intro__illustration" src="https://res.cloudinary.com/alexandracaulea/image/upload/v1583497233/intro-illustration_qneuer.svg" alt="" />
          </section>
        </main>
        </div>
        <footer class="footer">
          <div class="footer-container">
            <center><h3 class="footer-title">An initiative by Edunomics.in to make AI accessible</h3></center>
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