
let changeLesson = (e) => {

    let previusPlayingLesson = document.getElementsByClassName("playing")[0]
    console.log(previusPlayingLesson);
    if(previusPlayingLesson) {
        previusPlayingLesson.classList.remove("playing")
        previusPlayingLesson.children[0].src = '/play-button.svg'
    }

    let playIcon = e.target.previousElementSibling
    playIcon.src = '/play-button-on.svg'

    let lessonComponent = e.target.parentElement
    lessonComponent.classList.add("playing");

    let courseId = e.target.getAttribute('courseId')
    let videoUrl = e.target.getAttribute('videoUrl')

    let videoPlayer = document.getElementById('videoPlayer')

    let isTheIntro = e.target.getAttribute('introVid') === 'true' ? true : false

    if(isTheIntro) {
        let url = `/media/free/courses/${courseId}/demoVideos/${videoUrl}`
        videoPlayer.src = url

    } else {
        videoPlayer.src= `/media/courses/${courseId}/videoLessons/${videoUrl}`
    }


}

document.querySelectorAll(".play-list-text").forEach(lesson => {
    lesson.addEventListener("click", changeLesson)
});

document.getElementById('buy').addEventListener('click', (e) => {

    let courseId = e.target.getAttribute('courseId')


    window.location = `/checkout/${courseId}`
})

let checkCourseOwnerShip = async () => {

  let buttomElementLink = document.getElementById("buyButtomContainer")
  let buyButtom = document.getElementById("buy")

  const courseId = buttomElementLink.getAttribute("courseId")

  const response = await (await fetch(`/courses/${courseId}/checkOwnerShip`)).json();

  if(response.userCourseStatus === 'instructor') {
    buyButtom.textContent = "Edit"
    buttomElementLink.setAttribute("href",`/lesson/${courseId}/show`)
    //buttomElementLink.display = "block"

  }

  else if(response.userCourseStatus === "User") {
    buttomElementLink.style.display = "none"
  }

}

 async function failed(e) {
   // video playback failed - show a message saying why
   console.log(e.target.error);

    //const videoUrl = videoElement.src;
    try {
      const response = await fetch(e.target.src, { method: 'HEAD'});
      console.log(response);
      if (response.status === 401) {
        alertify
            .alert('Authentication error:', 'you must login to access all your courses 🔑', function(){
                alertify.message('OK');
                localStorage.setItem("wannaGoTo", document.location);
                document.location = '/user/login'
            });

       // console.log('Authentication error:', response.status);
        // Perform actions to handle the authentication error
      }

      else if (response.status === 403) {
        alertify
            .alert('Authentication error:', 'you must buy the course to watch all the lessons 💰', function(){
                alertify.message('OK');

            });
       // console.log('Authentication error:', response.status);
        // Perform actions to handle the authentication error
      }
    } catch (error) {
      console.error('Error catching HTTP response:', error);
    }
 }

 checkCourseOwnerShip()