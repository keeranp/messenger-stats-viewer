const messageProportion = data => {
    let participants = []
    for (let participant of data["participants"]) {
        participants.push(participant["name"])
    }

    let numSentMsg = new Array(participants.length).fill(0)

    for (let message of data["messages"]) {
        let index = participants.indexOf(message["sender_name"])
        numSentMsg[index]++
    }

    return [participants, numSentMsg]
}

const messagePerDay = data => {
    let participants = []
    for (let participant of data["participants"]) {
        participants.push(participant["name"])
    }

    let days = []
    let numSentMsg = new Array(participants.length).fill(0)

    previousTime = new Date(data["messages"][0]["timestamp_ms"])
    days.push(previousTime.toISOString().split('T')[0])

    for (let message of data["messages"]) {
        let time = new Date(message["timestamp_ms"])
        if (previousTime.getTime() + 86400000 < time.getTime()) {
            previousTime = time
            days.push(previousTime.toISOString().split('T')[0])
            numSentMsg[days.length - 1] = new Array(participants.length).fill(0)
        }
        numSentMsg[days.length - 1][participants.indexOf(message["sender_name"])]++
    }

    return [days, numSentMsg]
}

const timeBetweenMessage = data => {
    let participants = []
    for (let participant of data["participants"]) {
        participants.push(participant["name"])
    }

    let allLonguestTimeBetweenMessage = new Array(participants.length).fill(0)
    let allAverageTimeBetweenMessage = new Array(participants.length).fill(0)

    for (let i = 0; i < participants.length; i++) {
        allLonguestTimeBetweenMessage[i] = 0
        let averageTimeBetweenMessage = 0
        let numberOfMessages = 0
        let firstTime = 0
        let secondTime = 0

        for (let message of data["messages"]) {
            if (message["sender_name"] == participants[i]) {
                numberOfMessages++
                if (firstTime == 0) {
                    firstTime = new Date(message["timestamp_ms"])
                }
                else {
                    secondTime = new Date(message["timestamp_ms"])
                    let timeBetweenMessage = (secondTime - firstTime) / 1000
                    averageTimeBetweenMessage += timeBetweenMessage
                    if (allLonguestTimeBetweenMessage[i] < timeBetweenMessage) {
                        allLonguestTimeBetweenMessage[i] = timeBetweenMessage
                    }
                    firstTime = secondTime
                }
            }
        }

        if (numberOfMessages != 0) {
            allAverageTimeBetweenMessage[i] = averageTimeBetweenMessage / numberOfMessages
        } else {
            allAverageTimeBetweenMessage[i] = 0
        }
    }

    return [allLonguestTimeBetweenMessage, allAverageTimeBetweenMessage]
}

const averageWordPerMessage = data => {
    let participants = []
    for (let participant of data["participants"]) {
        participants.push(participant["name"])
    }

    averageWordPerMessageData = []

    for (let i = 0; i < participants.length; i++) {
        let nbMessage = 0
        let totalWords = 0
        for (let message of data["messages"]) {
            if (message["sender_name"] == participants[i]) {
                nbMessage++
                if (message["content"]) {
                    totalWords += message["content"].split(" ").length
                }
            }
        }

        if (nbMessage != 0) {
            averageWordPerMessageData.push(totalWords / nbMessage)
        }else{
            averageWordPerMessageData.push(0)
        }
    }

    return averageWordPerMessageData
}

module.exports = { messageProportion, messagePerDay, timeBetweenMessage, averageWordPerMessage }