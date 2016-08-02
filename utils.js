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

function expandAll(moreButton) {
    return new Promise(function (resolve, reject) {
        (function f() {
            if (moreButton.style.display != 'none') {
                moreButton.click();
                setTimeout(f, 100)
            }
            else {
                resolve()
            }
        })()
    })
}
