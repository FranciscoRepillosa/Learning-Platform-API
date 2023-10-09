
const createCourseCard = (course ) => {

    const courseCard = document.createElement('div')
    courseCard.setAttribute('class',"course-card")
    //courseCard.setAttribute('href', `./course/${course._id}`)

    courseCard.addEventListener('click', () => {
        window.location = `./courses/${course._id}/show`
    })

    const courseTitle = document.createElement('h2')
    courseTitle.setAttribute('class', 'course-card-title')
    courseTitle.textContent = course.name

    courseCard.appendChild(courseTitle)

    return courseCard



    // <div className="course-card" onClick={() => navigate(`/course/${_id}`)} >
    // <h2 className="course-card-title">
    //        {name}
    // </h2>
    // <img className="course-card-edit" src="lapiz.svg" alt="edit course"/>
    // <img className="course-card-img" src={`/courses/coverImage/${photo}`} alt="course"/>
// </div>

}

const removeChilds = (parentElement) => {

    while (parentElement.lastElementChild) {
        parentElement.removeChild(parentElement.lastElementChild)
    }

}

let addCourseElements = (courses, courseCardContainer) => {
    courses.forEach(course => {
        const courseCard = createCourseCard(course)
        courseCardContainer.appendChild(courseCard)
    });
} 

let displayLatestCourses = async () => {

    const res = await (await fetch(`/courses?latest="true"&limit=10`)).json()
    console.log(res);

    addCourseElements(res.data.courses, courseCardContainer)
} 

document.getElementById('searchBox').addEventListener('keyup', async (e) => {

    if(e.keyCode === 12+1) {

        const courseCardContainer = document.getElementById('courseCardContainer')
        
        let inputValue = e.target.value
        const res = await (await fetch(`/courses?searchInput=${inputValue}`)).json()
        console.log(res);

        if(res.data.courses.length) {

            if(courseCardContainer.childNodes.length) {removeChilds(courseCardContainer)}

            document.getElementById('bodyBgImg').style.overflow = "auto"
            document.getElementById('bodyBgImg').style.backgroundImage = "none"
            document.getElementById('bodyBgImg').classList.remove("home");


            document.getElementById('HeaderTitle').textContent = 'Search Results'

            addCourseElements(res.data.courses, courseCardContainer)

        }



    }

      
})

//displayLatestCourses()