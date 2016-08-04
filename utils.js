function getBySel(elmn, sel) {
    if (typeof elmn == 'string') {
        return document.querySelector(elmn);
    }
    return elmn.querySelector(sel);
}

function getAll(elmn, sel) {
    if (typeof elmn == 'string') {
        return document.querySelectorAll(elmn);
    }
    return elmn.querySelectorAll(sel);
}

function waitFor(selector) {
    return new Promise(function (resolve, reject) {
        var duration = 0,
            start_time = new Date();       
        
        (function f() {
            var element = getBySel(selector);
            
            if (element) {
                resolve();
            }
            else {
                duration = new Date() - start_time;
                if (duration >= conf.WAIT_TIMEOUT) {
                    reject(conf.ERROR.TIMEOUT + ' - ' + selector);
                }
                else {
                    setTimeout(f, 100);
                }
            }
        })();
    })
}

function waitContentChange(selector, oldSize) {
    return new Promise(function (resolve, reject) {
        var duration = 0,
            start_time = new Date();       
        
        (function f() {
            var element = getBySel(selector),
                text = element.innerText;
            
            if (text.length !== oldSize) {
                resolve();
            }
            else {
                duration = new Date() - start_time;
                if (duration >= conf.WAIT_TIMEOUT) {
                    reject(conf.ERROR.TIMEOUT + ' - ' + selector);
                }
                else {
                    setTimeout(f, 100);
                }
            }
        })();
    })    
}

function showAdvancedTab() {
    return new Promise(function (resolve, reject) {
        var button = getBySel(conf.ADVANCED_FILTER);
        if (!button) {
            reject(conf.ERROR.ADVANCED_NOT_FOUND);
        }
        else {
            button.click();
            waitFor(conf.SHOW_MORE_BUTTON)
            .then(resolve)
            .catch(reject);
        }
    })
}

function expandAll() {
    return new Promise(function (resolve, reject) {
        (function f() {
            var moreButton= getBySel(conf.SHOW_MORE_BUTTON);
            
            if (moreButton) {
                if (moreButton.style.display != 'none') {
                    var matchList = getBySel(conf.MATCH_LIST),
                        size = matchList.innerText.length;
                        
                    moreButton.click();
                    waitContentChange(conf.MATCH_LIST, size)
                    .then(f)
                    .catch(reject);
                }
                else {
                    resolve();
                }
            }
            else {
                reject(conf.ERROR.SHOW_MORE_NOT_FOUND);
            }
        })()
    })
}

function getOdds(match) {
    var outcomeSel = conf.OUTCOMES,
        bookSel = conf.BOOKMAKERS,
        map = Object.create(null),
        res = {
            distinct : 0,
            odds : [],
            bookmakers : []
        };
        
    for (var i = 0, len = outcomeSel.length; i < len; i++) {
        var outcome = getBySel(match, outcomeSel[i]);
        if (outcome) {
            var bookName = getBySel(match, bookSel[i]).innerHTML.trim();
            if (!map[bookName]) {
                map[bookName] = true;
                res.distinct++
            }
            res.bookmakers.push(bookName);
            res.odds.push(parseFloat(outcome.innerHTML) || 0);
        }
        else {
            res.bookmakers.push(null);
            res.odds.push(0);
        }
    }
    return res;
}

function getPercent(match) {
    var elmn = getBySel(match, conf.PERCENT);
    if (elmn) {
        return parseFloat(elmn.innerHTML);
    }
    return null;
}

function isMatchFilter(rangeConf, odds, percent) {
    var bookmakers = odds.bookmakers,
        values = odds.odds,
        isMatch = false;
        
    for (var i = bookmakers.length; i--;) {
        var range = rangeConf.ODDS_RANGE,
            value = values[i];
        if (bookmakers[i] === rangeConf.BOOKMAKER_NAME && value >= range[0] && value <= range[1]) {
            isMatch = true;
            break;
        }
    }
    if (percent) {
        return isMatch && percent >= rangeConf.PERCENT_RANGE[0] && percent <= rangeConf.PERCENT_RANGE[1];
    }
    return isMatch;
} 

function filterResult() {
    var items = getAll(conf.MATCH_ITEMS),
        matches = false;
    
    for (var i = 0, len = items.length; i < len; i++) {
        var item = items[i],
            odds = getOdds(item),
            percent = getPercent(item),
            currMatch = false;
        
        if (odds.distinct > 1) {
            if (isMatchFilter(conf.FIRST_BET, odds, percent)) {
                currMatch = true;
                item.className += ' ' + conf.FIRST_BET.CLASS;
            }
            if (isMatchFilter(conf.SECOND_BET, odds, percent)) {
                currMatch = true;
                item.className += ' ' + conf.SECOND_BET.CLASS;
            }
            if (isMatchFilter(conf.MOBILE_FIRST_BET, odds, percent)) {
                currMatch = true;
                item.className += ' ' + conf.MOBILE_FIRST_BET.CLASS;
            }
            if (isMatchFilter(conf.MOBILE_SECOND_BET, odds, percent)) {
                currMatch = true;
                item.className += ' ' + conf.MOBILE_SECOND_BET.CLASS;
            }
        }
        
        if (currMatch) {
            matches = true;
        }
        else {
            item.className += ' ' + conf.NON_MATCHED_CLASS;
        }
    }
}
