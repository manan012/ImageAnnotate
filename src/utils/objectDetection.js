const cocoSsd = require('@tensorflow-models/coco-ssd');

const detectObject = async (img) => {
    const imgEle = document.createElement('img');
    imgEle.src = img;
    const model = await cocoSsd.load();
    const predictions = await model.detect(imgEle);
    console.log(predictions)
    return predictions.map(prediction => ({
            name: prediction.class, 
            x:prediction.bbox[0], 
            y:prediction.bbox[1],
            width: prediction.bbox[2],
            height: prediction.bbox[3],
            stroke: "#00A3AA",
        }));
}

export default detectObject;

