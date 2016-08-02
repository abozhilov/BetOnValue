var matchList = getBySel(conf.MATCH_LIST), 
    showMore = getBySel(conf.SHOW_MORE_BUTTON); 

expandAll(showMore)
.then(function () {
    console.log('Done');
})
