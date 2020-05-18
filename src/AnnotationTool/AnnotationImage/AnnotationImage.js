import React from 'react';
import { Image } from 'react-konva';

class AnnotationImage extends React.Component {

        state = {
            image: ''
        };

        componentDidUpdate() {
            const image = new window.Image();   // make new wondow for image uploading
            image.src = this.props.image;       // get image url
            image.onload = () => {
                this.setState({
                    image
                });
            };
        }

        render() {
            return ( < Image image = { this.state.image }
                width = { window.innerWidth * 0.763 }
                height = { window.innerHeight * 0.88 }
                />);
            }
        }

        export default AnnotationImage;