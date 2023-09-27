

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

    console.log(res);
})