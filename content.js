

function automate() {
    expandAll()
    .then(function () {
        console.log('Done');
    })
    .catch(function (error) {
        throw new Error('BetOnValue Extension: ' + error)
    })
}

automate()
