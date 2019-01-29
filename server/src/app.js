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

app.get('/',(req, res) => {
    res.send({
        message:'hello world!'
    })
})

app.post('/upload', upload.single('file'),(req, res) => {
    const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALCATFACE);
    
    var image = ''
    const uploaded_image = cv.imread(req.file.path)
    const cats = classifier.detectMultiScale(uploaded_image).objects;
    fs.readFile(req.file.path, function(err,data) {
        var image = 'data:'+req.file.mimetype+';base64,' + (new Buffer(data.toString("base64") ) );
        res.send({
            message:`Your image was successfully uploaded! ${data}`,
            img:data,
            type:req.file.mimetype,
            cats:cats
        })
    })
    // const getFaceImage = (grayImg) => {
    //     const faceRects = classifier.detectMultiScale(grayImg).objects;
    //     if (!faceRects.length) {
    //         console.log('failed to detect faces');
    //     }
    //     if(faceRects.length) {
    //         return grayImg.getRegion(faceRects[0]);
    //     } else return
    // };
    // const imgsPath = 'images'
    // const imgFiles = fs.readdirSync(imgsPath)
    // const images = imgFiles
    //     // get absolute file path
    //     .map(file => path.resolve(imgsPath, file))
    //     // read image
    //     .map(filePath => cv.imread(filePath))
    //     // face recognizer works with gray scale images
    //     .map(img => img.bgrToGray())
    //     // detect and extract face
    //     .map(getFaceImage)
    //     // face images must be equally sized
    //     //.map(faceImg => faceImg.resize(80, 80));
    
})

app.listen(process.env.port || 8081)