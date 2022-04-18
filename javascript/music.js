window.onload = function () {
    getPlaylist();
    const logout = document.getElementById('logout');

    logout.addEventListener('click', function () {
        sessionStorage.clear();
        location.replace('./app.html')
    })


    function getPlaylist() {
        let dataTable = document.getElementById('song-table');
        fetch('http://localhost:9999/songs', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'token': sessionStorage.getItem("token"),
            },
        })
            .then((response) => {
                if (response.status == 500) {
                    throw Error("Sorry, something went wrong!!!")
                } else {
                    return response.json();
                }
            })
            .then((json) => {
                console.log(json);
                const tblData=json;
                console.log(tblData[0])
                console.log(tblData[0].id)

                for(let i=0;i<tblData.length;i++){
                    dataTable.innerHTML += "<tr><td>"+tblData[i].id+"</td>" +
                        "<td>"+tblData[i].title+"</td>" +
                        "<td>"+tblData[i].releaseDate+"</td>" +
                        "<td><button id='add'>Add</button></td>" +
                        "</tr>"
                }
            }).catch(error => {
            console.log(error)
            document.getElementById("welcome").innerText = "Sorry, incorrect Username or password!!!!";
        });
    }
}