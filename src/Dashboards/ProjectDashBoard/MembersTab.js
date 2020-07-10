import React, { Component, Fragment } from 'react';
import { Button, Table} from 'reactstrap';
import AddMemberModal from './AddMemberModal';

class MembersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addMemberModelOpen: false,
        }
    }
    toggleAddMemberModel = () => this.setState(state=> ({addMemberModelOpen: !state.addMemberModelOpen}))
    render() {
        return (
            <Fragment>
                <div className="py-3">
                    <Button color="primary" onClick={this.toggleAddMemberModel} className="d-block ml-auto">Add Members</Button>
                </div>
                <Table borderless className="border">
                    <thead className="border-bottom">
                        <tr className="">
                            <th>Email</th>
                            <th>Organization Role</th>
                            <th>Projects</th>
                            <th>Teams</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-bottom">
                            <td>rajeev011yadav@gmail.com</td>
                            <td>Admin</td>
                            <td>All</td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
                <AddMemberModal modelOpen={this.state.addMemberModelOpen} toggle={this.toggleAddMemberModel} />
            </Fragment>
        )
    }
}

export default MembersTab;