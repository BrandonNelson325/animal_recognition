const   express = require('express'),
        bodyParser = require('body-parser'),
        multer  = require('multer'),
        cors = require('cors'),
        morgan = require('morgan'),
        fs = require('fs'),
        cv = require('opencv4nodejs'),
        path = require('path')

const app = express()

//app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

var upload = multer({ dest: 'uploads/' })

const inceptionModelPath = 'inception5h'

const modelFile = path.resolve(inceptionModelPath, 'tensorflow_inception_graph.pb');
const classNamesFile = path.resolve(inceptionModelPath, 'imagenet_comp_graph_label_strings.txt');

if (!fs.existsSync(modelFile) || !fs.existsSync(classNamesFile)) {
    console.log('exiting: could not find inception model');
    console.log('download the model from: https://storage.googleapis.com/download.tensorflow.org/models/inception5h.zip');
    return;
}

// read classNames and store them in an array
const classNames = fs.readFileSync(classNamesFile).toString().split("\n");
// initialize tensorflow inception model from modelFile
const net = cv.readNetFromTensorflow(modelFile);

// Helper function from tensorflow
const classifyImg = (img) => {
    // inception model works with 224 x 224 images, so we resize
    // our input images and pad the image with white pixels to
    // make the images have the same width and height
    const maxImgDim = 224;
    const white = new cv.Vec(255, 255, 255);
    const imgResized = img.resizeToMax(maxImgDim).padToSquare(white);
  
    // network accepts blobs as input
    const inputBlob = cv.blobFromImage(imgResized);
    net.setInput(inputBlob);
  
    // forward pass input through entire network, will return
    // classification result as 1xN Mat with confidences of each class
    const outputBlob = net.forward();
  
    // find all labels with a minimum confidence
    const minConfidence = 0.05;
    const locations =
      outputBlob
        .threshold(minConfidence, 1, cv.THRESH_BINARY)
        .convertTo(cv.CV_8U)
        .findNonZero();
  
    const result =
      locations.map(pt => ({
        confidence: parseInt(outputBlob.at(0, pt.x) * 100) / 100,
        className: classNames[pt.x]
      }))
        // sort result by confidence
        .sort((r0, r1) => r1.confidence - r0.confidence)
        .map(res => `${res.className} (${res.confidence})`);
  
    return result;
}


// const testData = [
//     {
//       image: 'images/cat1.jpeg',
//       label: 'cat'
//     },
//     {
//       image: 'images/cat5.jpeg',
//       label: 'cat'
//     },
//     {
//       image: 'images/cat6.jpeg',
//       label: 'cat'
//     },
//     {
//       image: 'images/cat7.jpeg',
//       label: 'cat'
//     },
//     {
//       image: 'images/cat9.jpeg',
//       label: 'cat'
//     },
//   ];
  
//   testData.forEach((data) => {
//     const img = cv.imread(data.image);
//     console.log('%s: ', data.label);
//     const predictions = classifyImg(img);
//     predictions.forEach(p => console.log(p));
//     console.log();
  
//     //cv.imshowWait('img', img);
//   });

app.get('/',(req, res) => {
    res.send({
        message:'hello world!'
    })
})

app.post('/upload', upload.single('file'),(req, res) => {
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALCATFACE);
    
    const uploaded_image = cv.imread(req.file.path)
    const prediction = classifyImg(uploaded_image)
    
    const cats = classifier.detectMultiScale(uploaded_image).objects;
    fs.readFile(req.file.path, function(err,data) {
        var image = 'data:'+req.file.mimetype+';base64,' + (new Buffer(data.toString("base64") ) );
        res.send({
            message:`Your image was successfully uploaded! ${data}`,
            img:data,
            type:req.file.mimetype,
            cats:cats,
            prediction
        })
    })
})

app.listen(process.env.port || 8081)