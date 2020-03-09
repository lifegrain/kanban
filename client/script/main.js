const serverURL = `http://localhost:3000`

$(document).ready(() => {
    $.ajax({
        url: serverURL,
        method: `GET`
    })
        .done(data => {
            $(`body`).append(data.message)
        })
        .fail(err => {
            $(`body`).append(data.message)
        })
})