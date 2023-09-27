document.getElementById("submit").addEventListener('click', async (e) => {
    e.preventDefault()
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let password = document.getElementById("pass").value
    let confirmPassword = document.getElementById("confirmPassword").value
    var data = {
        name,
        email,
        password,
        confirmPassword
    };
    const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    console.log(res);
})