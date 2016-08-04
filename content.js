var reload_timer = null;

showAdvancedTab()
.then(function () {
    return expandAll();
})
.then(function () {
    filterResult();
})
.catch(function (error) {
    throw new Error('BetOnValue Extension: ' + error)
})

