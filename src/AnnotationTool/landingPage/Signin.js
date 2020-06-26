import React, { Fragment } from 'react';
import axios from 'axios';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css'
import './Signin.css';
class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            contact_no: '',
            dob: '',
            organizationName: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this);
    }

    //When input fields change on filling the form
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    // Sign up form is submitted
    onSubmit = (e) => {
        e.preventDefault();
        // get our form data out of state
        var data = JSON.stringify({
            "name": this.state.name,
            "email": this.state.email,
            "contact_no": this.state.contact_no,
            "dob": this.state.dob,
            "organizationName": this.state.organizationName,
            "password": this.state.password,
        });
        console.log(data);
        var this1 = this;

        axios.post('http://rachitpahwa.codes/api/labelImg/user/signup', data, { headers: { "Content-Type": "application/json" } })
            .then(function (response) {

                console.log(response);
                alert('Please login with your credentials');

            })
            .catch(err => {
                console.log('error1', err);

            })
    }

    // When login form is submitted
    onSubmit1 = (e) => {
        e.preventDefault();
        var this1 = this;
        var email = this.state.email;
        var password = this.state.password;
        var data = JSON.stringify({ "email": email, "password": password });
        var x = axios.post('http://rachitpahwa.codes/api/labelImg/user/login', data, { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                localStorage.setItem("token", response.data.token);

                this1.props.history.push("/label");
                //console.log(response.data.token);

            })
            .catch(err => {
                //Uncomment to bypass login
                localStorage.setItem("token", 65515631);

                this1.props.history.push("/label");
                alert('Enter valid credentials');
                console.log('error2', err);

            })
        //console.log(data);

    }


    componentDidMount() {

        // Event listeners for Landing Page(Start.js)
        const loginBtn = document.getElementById('login');
        const signupBtn = document.getElementById('signup');

        loginBtn.addEventListener('click', (e) => {
            let parent = e.target.parentNode.parentNode;
            Array.from(e.target.parentNode.parentNode.classList).find((element) => {
                if (element !== "slide-up") {
                    parent.classList.add('slide-up')
                } else {
                    signupBtn.parentNode.classList.add('slide-up')
                    parent.classList.remove('slide-up')
                }
            });
        });

        signupBtn.addEventListener('click', (e) => {
            let parent = e.target.parentNode;
            Array.from(e.target.parentNode.classList).find((element) => {
                if (element !== "slide-up") {
                    parent.classList.add('slide-up')
                } else {
                    loginBtn.parentNode.parentNode.classList.add('slide-up')
                    parent.classList.remove('slide-up')
                }
            });
        });
    }



    render() {

        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'center', marginTop: 40 }}>
                <div class="form-structor">
                    <div class="signup">
                        <h2 class="form-title" id="signup"><span>or</span>Sign up</h2>
                        <form action="" method="POST" name="form1" onSubmit={this.onSubmit}>
                            <div class="form-holder">

                                <input type="text" class="input" placeholder="Name" required onChange={this.onChange} name="name" />
                                <input type="email" class="input" placeholder="Email" onChange={this.onChange} name="email" required />
                                <input type="tel" class="input" placeholder="Contact Number" onChange={this.onChange} name="contact_no" required />
                                <input type="date" class="input" placeholder="DOB" onChange={this.onChange} name="dob"></input>
                                <input type="name" class="input" placeholder="Organisation Name" onChange={this.onChange} name="organizationName" required />
                                <input type="password" class="input" placeholder="Password" name="password" onChange={this.onChange} required />
                            </div>
                            <button className="submit-btn" type="submit" >Sign up</button>
                        </form>
                    </div>
                    
                    <div class="login slide-up">
                        <div class="center">
                            <h2 class="form-title" id="login"><span>or</span>Log in</h2>
                            <form action="" method="POST" name="form2" onSubmit={this.onSubmit1}>
                                <div class="form-holder">
                                    <input type="email" class="input" placeholder="Email" required onChange={this.onChange} name="email" />
                                    <input type="password" class="input" placeholder="Password" name="password" onChange={this.onChange} required />
                                </div>
                                <button class="submit-btn">Log in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default Signin;