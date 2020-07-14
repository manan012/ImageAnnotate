import React, { Component } from 'react'
import { DropdownItem, Dropdown, DropdownToggle, NavItem, Nav, DropdownMenu, NavbarToggler, NavbarText, Navbar, NavbarBrand, Collapse } from 'reactstrap'
import { Link } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import MemberNotification from './MemberNotification';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            dropDownOpen: false,
            notificationDropdownOpen: false
        }
    }
    componentDidMount() {
        if (this.props.user.loggedIn && this.props.notificationStatus === 'NOT_FETCHED') {
            this.props.fetchNotification();
        }
    }
    
    toggle = () => this.setState(state => {isOpen: !state.isOpen});
    toggleDropDown = () => this.setState({dropDownOpen: !this.state.dropDownOpen});
    toggleNotificationDropdown = () => this.setState({notificationDropdownOpen: !this.state.notificationDropdownOpen})
    render() {
        return (
            <Navbar color="light px-5" light expand="md">
                <NavbarBrand href="/">LabelEdunomics</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                {
                    this.props.user.loggedIn ?
                    <Nav className="ml-auto" navbar>
                        {/* <NavItem>
                            <Link>Component</Link>
                        </NavItem> */}
                        <div className="dropdown">
                            <button className="btn" type="button" onClick={this.toggleNotificationDropdown} data-toggle="dropdown">
                                <i class="fas fa-bell"></i>
                            </button>
                            <div className={"dropdown-menu " + (this.state.notificationDropdownOpen ? "show" : "")}>
                                {
                                    this.props.notifications.filter(n => n.status === 'PENDING').length === 0 ?
                                    <div class="px-2 text-muted"><small>No notification</small></div>
                                    : this.props.notifications
                                    .filter(n => n.status === 'PENDING')
                                    .map(n => <MemberNotification notification={n}/>)
                                }
                            </div>
                        </div>     
                        <div className="dropdown">
                            <button className="btn" type="button" onClick={this.toggleDropDown} data-toggle="dropdown">
                                {this.props.user.name} <i class="fas fa-caret-down"></i>
                            </button>
                            <div className={"dropdown-menu " + (this.state.dropDownOpen ? "show" : "")}>
                                <a className="dropdown-item"
                                onClick={this.props.logout}
                                >Log out</a>
                            </div>
                        </div>   
                    </Nav>
                    : null
                }
                </Collapse>
            </Navbar>
        )
    }
}

const matchStateToProps = (state) => ({
    user: state.user,
    notifications: state.notifications.notifications,
    notificationStatus: state.notifications.status
})

const matchDispatchToProps = (dispatch) => ({
    logout: () => dispatch({type: 'LOGOUT'}),
    fetchNotification: () => dispatch({type: 'FETCH_NOTIFICATION'}),
})
export default connect(matchStateToProps, matchDispatchToProps)(Header);
