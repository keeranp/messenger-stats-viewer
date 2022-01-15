const { Chart } = require("chart.js")
const { createMessagePerDayChart, updateMessagePerDayChart } = require("./chart")
const messagePerDay = require("./stats")
const utils = require("./utils")

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

        //Clean the JSON files because they are incorrectly encoded and merge them into one file.
        new Promise(resolve => utils.cleanData(files, resolve)).then(fileData => {
            if ($("#charts").length === 0) {
                let msgPerDayData = messagePerDay(fileData)
                createMessagePerDayChart(msgPerDayData, fileData)
            } else {
                let msgPerDayData = messagePerDay(fileData)
                updateMessagePerDayChart(msgPerDayData, fileData)
            }
        })
    }
}