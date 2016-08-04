var conf = {
    ADVANCED_FILTER : 'a[data-nmtab="nmAdvancedFiltersTab"]',
    SHOW_MORE_BUTTON : '#subtab-startTime > a',
    MATCH_LIST : '#subtab-startTime > ol',
    MATCH_ITEMS : '#subtab-startTime > ol > li.TheMatch',
    OUTCOMES : ['.Outcome1 span.Odds', '.Outcome2 span.Odds', '.Outcome3 span.Odds'],
    BOOKMAKERS : ['.Outcome1 span.BM.OTBookie', '.Outcome2 span.BM.OTBookie', '.Outcome3 span.BM.OTBookie'],
    PERCENT : 'div.MatchDetails > div.MDxInfo > span.ShowingPayout',
    
    FIRST_BET : {
        ODDS_RANGE : [2.0, 2.8],
        PERCENT_RANGE : [98, 99.7],
        BOOKMAKER_NAME : 'bet365',
        CLASS : 'FirstBet'
    },
    
    SECOND_BET : {
        ODDS_RANGE : [1.5, 1.8],
        PERCENT_RANGE : [98, 99.7],
        BOOKMAKER_NAME : 'bet365',
        CLASS : 'SecondBet'
    },
    
    MOBILE_FIRST_BET : {
        ODDS_RANGE : [2.5, 3.8],
        PERCENT_RANGE : [97, 99.7],
        BOOKMAKER_NAME : 'bet365',
        CLASS : 'MobileBet'
    },
    
    MOBILE_SECOND_BET : {
        ODDS_RANGE : [1.5, 1.8],
        PERCENT_RANGE : [98, 99.7],
        BOOKMAKER_NAME : 'bet365',
        CLASS : 'SecondMobileBet'
    },
    
    NON_MATCHED_CLASS : 'NonActive',   
    
    RELOAD_INTERVAL : 1000, // 1 sec
    WAIT_TIMEOUT : 10000, //10 sec
    
    ERROR : {
        SHOW_MORE_NOT_FOUND : 'Show more button is not found',
        ADVANCED_NOT_FOUND : 'Advanced filters not found',
        TIMEOUT : 'Timeout error'
    }
}
