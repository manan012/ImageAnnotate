import React from 'react';
import { Image } from 'react-konva';

class AnnotationImage extends React.Component {

    state = {
        image: ''
    };

    componentDidUpdate() {
        const image = new window.Image();
        image.src = this.props.image;
        image.onload = () => {
            this.setState({
                image
            });
        };
    }

    render() {   
        return ( <Image 
                    image =  {this.state.image}
                     width = {window.innerWidth*0.84}
                     height = {window.innerHeight}
                />);
    }
}

export default AnnotationImage;