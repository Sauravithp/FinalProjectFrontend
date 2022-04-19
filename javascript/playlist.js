function upTo(node, tagName) {
    if (!node || !tagName) return;
    tagName = ('' + tagName).toLowerCase();
    while ((node = node.parentNode) && node.tagName) {
        if (node.tagName.toLowerCase() == tagName) {
            return node;
        }
    }
    return null;
}

function addSong(node) {
    const row = upTo(node, 'tr');
   const songId=row.parentNode.querySelector('td').innerText;
   console.log(songId)
    fetch(`http://localhost:9999/playList?songId=${songId}`, {
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
            const tblData = json;
            console.log(tblData[0])
            console.log(tblData[0].id)

            for (let i = 0; i < tblData.length; i++) {
                dataTable.innerHTML += "<tr><td>" + tblData[i].songId + "</td>" +
                    "<td>" + tblData[i].title + "</td>" +
                    "<td>" + tblData[i].releaseDate + "</td>" +
                    "<td><button id='remove'>Delete</button><button id='play'' >Play</button></td>" +
                    "</tr>"
            }
        }).catch(error => {
        console.log(error)
    });
    location.reload();

}

function removeSong(node) {
    const row = upTo(node, 'tr');
    const songId=row.parentNode.querySelector('td').innerText;
    console.log(songId)
    fetch(`http://localhost:9999/playList/${songId}`, {
        method: 'DELETE',
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
        }).catch(error => {
        console.log(error)
    });
    location.reload();

}


