import React, { Fragment } from "react";
import axios from "axios";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./Signin.css";
import User from "../../api/User";
import { connect } from "react-redux";
class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contact_no: "",
      dob: "",
      organizationName: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  //When input fields change on filling the form
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Sign up form is submitted
  onSubmitSignUp = (e) => {
    e.preventDefault();
    // get our form data out of state
    var data = {
      name: this.state.name,
      email: this.state.email,
      contact_no: this.state.contact_no,
      dob: this.state.dob,
      organizationName: this.state.organizationName,
      password: this.state.password,
    };
    console.log(data);
    var this1 = this;
    this.props.signUp(data);
  };

  // When login form is submitted
  onSubmitLogin = (e) => {
    e.preventDefault();
    var this1 = this;
    var email = this.state.email;
    var password = this.state.password;
    this.props.logIn(email, password);
    //console.log(data);
  };

  componentDidMount() {
    // Event listeners for Landing Page(Start.js)
    const loginBtn = document.getElementById("login");
    const signupBtn = document.getElementById("signup");

    loginBtn.addEventListener("click", (e) => {
      let parent = e.target.parentNode.parentNode;
      Array.from(e.target.parentNode.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          signupBtn.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });

    signupBtn.addEventListener("click", (e) => {
      let parent = e.target.parentNode;
      Array.from(e.target.parentNode.classList).find((element) => {
        if (element !== "slide-up") {
          parent.classList.add("slide-up");
        } else {
          loginBtn.parentNode.parentNode.classList.add("slide-up");
          parent.classList.remove("slide-up");
        }
      });
    });
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <div class="form-structor">
          <div class="signup ">
            <h2 class="form-title" id="signup">
              <span>or</span>Sign up
            </h2>
            <form
              action=""
              method="POST"
              name="form1"
              onSubmit={this.onSubmitSignUp}
            >
              <div class="form-holder">
                <input
                  type="text"
                  class="input"
                  placeholder="Name"
                  required
                  onChange={this.onChange}
                  name="name"
                />
                <input
                  type="email"
                  class="input"
                  placeholder="Email"
                  onChange={this.onChange}
                  name="email"
                  required
                />
                <input
                  type="tel"
                  class="input"
                  placeholder="Contact Number"
                  onChange={this.onChange}
                  name="contact_no"
                  required
                />
                <input
                  type="date"
                  class="input"
                  placeholder="DOB"
                  onChange={this.onChange}
                  name="dob"
                ></input>
                <input
                  type="name"
                  class="input"
                  placeholder="Organisation Name"
                  onChange={this.onChange}
                  name="organizationName"
                  required
                />
                <input
                  type="password"
                  class="input"
                  placeholder="Password"
                  name="password"
                  onChange={this.onChange}
                  required
                />
              </div>
              <button className="submit-btn" type="submit">
                Sign up
              </button>
            </form>
          </div>

          <div class="login slide-up">
            <div class="center">
              <h2 class="form-title" id="login">
                <span>or</span>Log in
              </h2>
              <form
                // action=""
                // method="POST"
                name="form2"
                onSubmit={this.onSubmitLogin}
              >
                <div class="form-holder">
                  <input
                    type="email"
                    class="input"
                    placeholder="Email"
                    required
                    onChange={this.onChange}
                    name="email"
                  />
                  <input
                    type="password"
                    class="input"
                    placeholder="Password"
                    name="password"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <button class="submit-btn">Log in</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const matchDispatchToProps = (dispatch) => ({
  logIn: (email, password) => dispatch({type: 'LOGIN', logInCred: {email, password}}),
  signUp: (data) => dispatch({type: 'SIGNUP', signUpCred: data})
})

export default connect(null, matchDispatchToProps)(Signin);
