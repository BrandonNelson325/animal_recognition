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
})

app.listen(process.env.port || 8081)