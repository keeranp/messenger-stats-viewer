const { Chart } = require("chart.js")
const { createMessagePerDayChart, updateMessagePerDayChart, createTimeBetweenMessageInfo, updateTimeBetweenMessageInfo, createAverageWordPerMessageInfo, updateAverageWordPerMessageInfo, createMessagePieChart, updateMessagePieChart } = require("./dataVisualisation")
const stats = require("./stats")
const utils = require("./utils")

document.getElementById("selectFiles").oninput = () => {
    let files = document.getElementById("selectFiles").files

    //Clean the JSON files because they are incorrectly encoded and merge them into one file.
    new Promise(resolve => utils.cleanData(files, resolve)).then(fileData => {
        if ($("#charts").html() === "") {
            let messageProportionData = stats.messageProportion(fileData)
            createMessagePieChart(messageProportionData, fileData)
            
            let msgPerDayData = stats.messagePerDay(fileData)
            createMessagePerDayChart(msgPerDayData, fileData)

            let timeBetweenMessageData = stats.timeBetweenMessage(fileData)
            createTimeBetweenMessageInfo(timeBetweenMessageData, fileData)

            let averageWordPerMessageData = stats.averageWordPerMessage(fileData)
            createAverageWordPerMessageInfo(averageWordPerMessageData, fileData)
        } else {
            let messageProportionData = stats.messageProportion(fileData)
            updateMessagePieChart(messageProportionData, fileData)

            let msgPerDayData = stats.messagePerDay(fileData)
            updateMessagePerDayChart(msgPerDayData, fileData)

            let timeBetweenMessageData = stats.timeBetweenMessage(fileData)
            updateTimeBetweenMessageInfo(timeBetweenMessageData, fileData)

            let averageWordPerMessageData = stats.averageWordPerMessage(fileData)
            updateAverageWordPerMessageInfo(averageWordPerMessageData, fileData)
        }
    }).then(() => {
        $('html,body').animate({
            scrollTop: $("#content").offset().top
        },
            1000);
    }).catch((e) => {
        console.log(e)
    })
}