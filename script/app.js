const { Chart } = require("chart.js")
const { createMessagePerDayChart, updateMessagePerDayChart, createTimeBetweenMessageInfo, updateTimeBetweenMessageInfo, createAverageWordPerMessageInfo, updateAverageWordPerMessageInfo } = require("./chart")
const stats = require("./stats")
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
                $("body").append("<div id='charts'></div>")
                let msgPerDayData = stats.messagePerDay(fileData)
                createMessagePerDayChart(msgPerDayData, fileData)

                let timeBetweenMessageData = stats.timeBetweenMessage(fileData)
                createTimeBetweenMessageInfo(timeBetweenMessageData, fileData)

                let averageWordPerMessageData = stats.averageWordPerMessage(fileData)
                createAverageWordPerMessageInfo(averageWordPerMessageData, fileData)
            } else {
                let msgPerDayData = stats.messagePerDay(fileData)
                updateMessagePerDayChart(msgPerDayData, fileData)

                let timeBetweenMessageData = stats.timeBetweenMessage(fileData)
                updateTimeBetweenMessageInfo(timeBetweenMessageData, fileData)

                let averageWordPerMessageData = stats.averageWordPerMessage(fileData)
                updateAverageWordPerMessageInfo(averageWordPerMessageData, fileData) 
            }
        })
    }
}