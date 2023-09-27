const formElememt = document.getElementById('formElememt')

console.log(formElememt);

formElememt.onsubmit  = async (e) => {

    e.preventDefault()

    const formData = new FormData();
    const lessonName = document.getElementById('lessonName').value
    const videoLesson = document.getElementById('videoLesson')

    formData.append('lessonName',lessonName )
    formData.append('videoLesson',videoLesson.files[0] )

    const courseId = formElememt.getAttribute('courseId')


    
    const res = await fetch(`/lesson/${courseId}`, {
        method: 'POST',
        body: formData
    })

    console.log(res);

}