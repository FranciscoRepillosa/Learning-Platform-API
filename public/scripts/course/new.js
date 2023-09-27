

document.getElementById('submit').addEventListener('click', (e) => {
  
  e.preventDefault()

  const CoverImage = document.getElementById('CoverImage').files[0]
  const VideoIntro = document.getElementById('VideoIntro').files[0]
  const CourseName = document.getElementById('CourseName').value
  const CourseDescription = document.getElementById('CourseDescription').value
  const price = document.getElementById('price').value


  const formData = new FormData(); 
    
  formData.append( 
    "coverImage", 
    CoverImage
  );

  formData.append( 
    "videoIntro", 
    VideoIntro
  );

  formData.append( 
    "courseName", 
    CourseName, 
  );

  formData.append( 
    "courseDescription", 
    CourseDescription, 
  );

  formData.append( 
    "price", 
    price, 
  );

  console.log(formData);
  
  // Request made to the backend api 
  // Send formData object 
  fetch("/courses", {
    method: "POST",
    body: formData
  })
    .then(response => {
      console.log(response);
      // Handle the response
    })
    .catch(error => {
      console.log(error);
      // Handle the error
    });
  

})

