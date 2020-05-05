import React from 'react';
import { Image } from 'react-konva';

class AnnotationImage extends React.Component {
    state = {
        image: null,
    };

    componentDidMount() {
        const image = new window.Image();
        image.src = 'https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80';
        image.onload = () => {
            this.setState({
                image,
            });
        };
    }

    render() {
        const {
            state: { image },
        } = this;
        return ( <
            Image height = { 700 }
            width = { 900 }
            image = { image }
            />
        );
    }
}

export default AnnotationImage;