window.onload = function () {
    const login = document.getElementById('login');
    const username = document.getElementById('username');
    const password = document.getElementById('password');

    login.addEventListener('click', function () {
        console.log("username--->"+username.value);
        console.log("password--->"+password.value);

        fetch('http://localhost:9999/login', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                password: password.value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                console.log(response.json())
                response.json();
            })
    })
}