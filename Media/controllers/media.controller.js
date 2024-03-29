const catchAsync = require("../../utils/catchAsync");
const fs = require("fs");
const path = require("path");
const vidPath = "C:\Users\computador\Desktop\proyects\cloned-learning-platfrom-api\Learning-Platform-API\MediaStorage\courses\demoVideos\1625242482790-VID_20210701_133729.mp4";

exports.getMedia = catchAsync( async (req, res) => {

    const file = `./MediaStorage/${req.params.mediaSource}/${req.params.mediaType}/${req.params.mediaId}`;

    console.log('file mf: ',file);
  
    const getVideoData = new Promise(function (resolve, reject) {
  
          
        fs.readFile(`./MediaStorage/${req.params.mediaSource}/${req.params.mediaType}/${req.params.mediaId}`, function (err, media) {
            
            if (err) {
              return reject(new Error(err))
            }
            const stat = fs.statSync(`./MediaStorage/${req.params.mediaSource}/${req.params.mediaType}/${req.params.mediaId}`);
            const fileSize = stat.size;
            return resolve({ media, stat, fileSize});
            
      });
    });
/*
    const sendVideo = async () => {
      try {
      const video = await getVideoData;

      const range = req.headers.range;
      console.log("range",req.headers.range);
	  
	  if (!range) {
		res.status(400).send("requires range headers");
	  }
	  
	  

      const CHUNK_SIZE = 10 ** 6; // 1MB
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, video.fileSize - 1);
      console.log(`start:${start}, end${end} size${video.fileSize}`  );
   
      // Create headers
      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${video.fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength ,
        "Content-Type": "video/mp4",
      };
      console.log(headers);
        res.writeHead(206, headers)
    
      fs.createReadStream(file, {start , end}).pipe(res);
      } catch (e) {
        console.log(e);
      }
    }

    sendVideo();

*/
   
    if(req.params.mediaType === "coverImages") {
      let imgPath = path.join(__dirname, '..', '../MediaStorage/courses/coverImages',req.params.mediaId )
      res.sendFile(imgPath)
    }
    else {
      getVideoData.then(video => {
    
        const range = req.headers.range
        console.log('fet file: ', video);
        console.log('headers ',req.headers);
         
        // Parse Range
        // Example: "bytes=32324-"
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, video.fileSize - 1);
        //let [start, end]  = range.replace(/bytes=/, "").split("-");
        //const end = Math.min(start + CHUNK_SIZE, video.fileSize - 1);
        //start = parseInt(start, 10);
        //end = end ? parseInt(end, 10) : video.fileSize-1;
        console.log(`start:${start}, end${end} size${video.fileSize}`  );
       
        // Create headers
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${video.fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };
       console.log(headers);
          res.writeHead(206, headers)
  
          console.log(file)
        
          fs.createReadStream(file, {start , end} ).pipe(res);
      
      }).catch(e => console.log(e));
    }

   // C:\Users\Administrador\Documents\Franxisco\apps\Learning-Platform-API\MediaStorage\courses\coverImages\1695220159744-5D322DC4-1E29-4883-B9D2-DAB9552A0955.jpeg
   // C:\Users\Administrador\Documents\Franxisco\apps\Learning-Platform-API\MediaStorage\course\coverImages\1695220159744-5D322DC4-1E29-4883-B9D2-DAB9552A0955.jpeg
});  


exports.getUserImage = catchAsync( async (req, res) => {

console.log("enter to get image")

  res.sendFile(__dirname + "/1622834418122-20z. Diagrama Clase #20.png")

  
});