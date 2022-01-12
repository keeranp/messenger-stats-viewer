const utf8 = require('utf8');

const cleanData = (files, mainResolve) => {
    let promises = []
    let mainReader = new FileReader()

    mainReader.onload = event => {
        let data = JSON.parse(event.target.result);
        data["messages"] = []
        data["title"] = utf8.decode(data["title"])

        for (let participant of data["participants"]) {
            participant['name'] = utf8.decode(participant['name'])
        }

        for (const file of files) {
            let filePromise = new Promise(resolve => {
                let reader = new FileReader()

                reader.onload = event => {
                    newData = JSON.parse(event.target.result)

                    for (let message of newData["messages"]) {
                        try {
                            if (message["content"]) message['content'] = utf8.decode(message['content'])

                            if (message["reactions"]) {
                                for (let reaction of message["reactions"]) {
                                    reaction["reaction"] = utf8.decode(reaction["reaction"])
                                }
                            }

                            message["sender_name"] = utf8.decode(message["sender_name"])
                        } catch (e) {
                            console.log(e)
                            console.log(message)
                        }
                    }

                    resolve(newData["messages"])
                }
                reader.readAsText(file)
            })
            promises.push(filePromise)
        }

        Promise.all(promises).then(messages => {
            for(let message of messages){
                data["messages"] = data["messages"].concat(message)
            }

            mainResolve(data)
        })
    }

    mainReader.readAsText(files[0])
}

module.exports = cleanData