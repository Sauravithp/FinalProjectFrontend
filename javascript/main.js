window.onload = function () {
    const login = document.getElementById('login');
    const logout = document.getElementById('logout');

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    login.addEventListener('click', function () {
        console.log("username--->" + username.value);
        console.log("password--->" + password.value);

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
                console.log("promise......" + response)
                console.log("response status" + response.status);
                if (response.status == 500) {
                    throw Error ("Sorry, incorrect Username or password!!!!")
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                sessionStorage.setItem("token", json);
                sessionStorage.setItem("username",username.value);
                console.log("json--->" + json)
                location.replace('./music.html')
            }).catch(error =>{
            console.log(error)
            document.getElementById("welcome").innerText = "Sorry, incorrect Username or password!!!!";
        } );
    })


    logout.addEventListener('click', function () {
        sessionStorage.clear();
    })
}