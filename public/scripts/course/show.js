
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
        videoPlayer.src= `http://localhost:2121/media/courses/${courseId}/videoLessons/${videoUrl}`
    }


}

document.querySelectorAll(".play-list-text").forEach(lesson => {
    lesson.addEventListener("click", changeLesson)
});

document.getElementById('buy').addEventListener('click', (e) => {

    let courseId = e.target.getAttribute('courseId')


    window.location = `/checkout/${courseId}`
})