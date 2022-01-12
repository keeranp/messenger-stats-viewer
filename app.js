const cleanData = require("./utils")

document.getElementById("import").onclick = () => {
    let files = document.getElementById("selectFiles").files

    if (files.length === 0) {
        if ($("#error").length === 0) {
            $("body").append("<h6 id='error'>No file selected.</h6>")
        }
    } else {
        if ($("#error").length > 0) {
            $("#error").remove()
        }

        if ($("#result").length === 0) {
            //Clean the JSON files because they are incorrectly encoded and merge them into one file.
            new Promise(resolve => cleanData(files, resolve)).then(data => console.log(data))
        }
    }
}