import React, { Component, Fragment } from 'react';
import { Button, Table} from 'reactstrap';

class MembersTab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div className="py-3">
                    <a href="/#/label">
                        <Button color="primary" className="d-block ml-auto">Add Members</Button>
                    </a>
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
            </Fragment>
        )
    }
}

export default MembersTab;