const fs = require("fs");
const { setFlagsFromString } = require("v8");
const express = require("express");
const app = express()
const multer = require("multer");

const port  = 3001;

const cors = require("cors");

const server = app.listen(port, function () {
  console.log(`listen on port `, port )
});

/*
const getVideoData = new Promise(function (resolve, reject) {

        
            fs.readdir("uploads", function (err, files) {
                
                if (err) {
                    return reject(new Error(err))
                }
                const videoPath = files[0];
                const stat = fs.statSync(`./uploads/${videoPath}`);
                const fileSize = stat.size;
                return resolve({ videoPath, stat, fileSize})
          });
});

getVideoData.then(data => console.log(data))




let promise = new Promise(function(resolve, reject) {
    setTimeout(() => resolve("done!"), 1000);
  });
  
  // resolve runs the first function in .then
  promise.then(
    result => console.log(result), // shows "done!" after 1 second
    error => console.log(error) // doesn't run
  );

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage })
  */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "media/test");
    },
    filename: (req, file, cb) => {
      const exc = file.mimetype.split("/")[1];
      console.log(file);
      //req.body.videoPath = `${req.params.courseId}-${file.originalname}`;
      cb(null, `${file.originalname}`);
    }
  })
  
  const upload = multer({
    storage
  });
  

  app.use(cors());

  app.get("/", function (req, res) {
      res.sendFile(__dirname + "/index.html");
    });

let MultOptions = [
      { name: 'coverImage', maxCount: 1 },
      { name: 'videoIntro', maxCount: 1 }
    ]

app.post("/ramdon", upload.fields(MultOptions) , (req, res) => {
  console.log(req.body);
    res.send(req.body);
});
  

  app.get("/img", (req, res) => {
    console.log(req.headers);
    res.sendFile(__dirname + "/187c4255-30d9-48d6-ba2d-71568fc3bff3.jpg");
  } )
  
  app.get("/video1", function (req, res) {

    if (req.headers.msg !== "piyo") {
      console.log("oh oh");  
      res.send("hola")
    }
  
    
    const getVideoData = new Promise(function (resolve, reject) {
  
          
      fs.readdir("uploads", function (err, files) {
          
          if (err) {
              return reject(new Error(err))
          }
          const videoPath = files[0];
          const stat = fs.statSync(`./uploads/${videoPath}`);
          const fileSize = stat.size;
          return resolve({ videoPath, stat, fileSize})
    });
  });
  
  getVideoData.then(video => {
  
    const range = req.headers.range
  
     
    // Parse Range
    // Example: "bytes=32324-"
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, video.fileSize - 1);
    console.log(`start:${start}, end${end} CHUNK${CHUNK_SIZE}`  );
   
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${video.fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
   
      res.writeHead(206, headers)
    
      fs.createReadStream(`./uploads/${video.videoPath}`, {start , end}).pipe(res);
  
  })
   
      
  });
  
  
  app.get("/upload", function (req, res) {
     res.sendFile(__dirname + "/upload.html");
  });
  
  /*
  app.post("/upload", upload.single("video"), function (req, res) {
    return res.json({status: "OK"});
  });
  */
  
  app.get("/audio", function (req, res) {
    const range = req.headers.range
  
    const audioPath = "Post Malone - rockstar ft. 21 Savage.mp3";
  
    const stat = fs.statSync(audioPath)
      const audiofileSize = stat.size;
  
    const CHUNK_SIZE = 10 ** 6; // 1MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, audiofileSize - 1);
  
    // Create headers
    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${audiofileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };
   
      res.writeHead(206, headers)
  
    fs.createReadStream(audioPath, { start, end }).pipe(res);
  
  })

