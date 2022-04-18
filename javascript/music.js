window.onload = function () {
    const logout = document.getElementById('logout');

    logout.addEventListener('click',function (){
        sessionStorage.clear();
        location.replace('./app.html')
    })
}