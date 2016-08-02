function getBySel(elmn, sel) {
    if (typeof elmn == 'string') {
        return document.querySelector(elmn);
    }
    return elmn.querySelector(sel);
}

function getAllSel(elmn, sel) {
    if (typeof elmn == 'string') {
        return document.querySelectorAll(elmn);
    }
    return elmn.querySelectorAll(sel);
}

function expandAll() {
    return new Promise(function (resolve, reject) {
        var hasMore = false,
            count = 0,
            moreButton;
        (function f() {
            moreButton= getBySel(conf.SHOW_MORE_BUTTON);
            hasMore = true;
            
            if (++count >= conf.MAX_SHOW_MORE_CALLS) {
                reject(conf.ERROR.TOO_MUCH_CLICKS);
            }
            
            if (moreButton) {
                if (moreButton.style.display != 'none') {
                    moreButton.click();
                    setTimeout(f, 10);
                }
                else {
                    resolve();
                }
            }
            else if (!hasMore) {
                reject(conf.ERROR.SHOW_MORE_NOT_FOUND);
            }
        })()
    })
}

function filterResult() {
    
}
