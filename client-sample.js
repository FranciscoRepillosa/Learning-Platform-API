console.log("i'm alive");

fetch("http://localhost:3001/video1").then(course => console.log("course:", course));

const feching = async () => {
    let response = await fetch("http://localhost:3001/video1", {
        headers: {
            Accept: "*/*",
            "Accept-Encoding": "identity;q=1, *;q=0",
            "Accept-Language": "en,en-US;q=0.9,es-US;q=0.8,es-419;q=0.7,es;q=0.6",
           " Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "localhost:3001",
            "Pragma": "no-cache",
            "Range": "bytes=0-",
            "Sec-Fetch-Dest": "video",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36"
        }
    }); // resolves with response headers
    let result = await response.json();
    console.log(result, "hi");
}



  