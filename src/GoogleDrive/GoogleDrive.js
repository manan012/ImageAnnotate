import React from 'react';
import {gapi} from 'gapi-script'

const GoogleDrive = () => {
    gapi.load('client', () => {
        gapi.client
    })
    return (
        <div>Google Drive</div>
    )
}

export default GoogleDrive;