

document.getElementById("submit").addEventListener('click', async (e) => {
    e.preventDefault()
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value
    var data = {
        email,
        password
    };
    const res = await fetch('/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    console.log(res.status);

    if  (res.status === 201) {
        console.log(localStorage.getItem("wannaGoTo"));
        document.location = localStorage.getItem("wannaGoTo") ? localStorage.getItem("wannaGoTo") : '/'
        
    }

    else{
        alertify
            .alert('Authentication error:', 'wrong credentials, your suss 🧐', function(){
                alertify.warning("i'm watching u");
            });
    }
})