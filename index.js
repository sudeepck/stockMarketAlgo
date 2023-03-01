//https://docs.google.com/spreadsheets/d/10VTlKKOG5bxZZwF6uxvsQ1waOr5Xe7-sX80ALLEDbLs/edit#gid=0
//https://docs.google.com/spreadsheets/d/10VTlKKOG5bxZZwF6uxvsQ1waOr5Xe7-sX80ALLEDbLs/edit#gid=0

//https://github.com/prediqtiv/alpha-vantage-cookbook/blob/master/symbol-lists.md

const express = require('express')
const app = express()
const path = require('path');
const {executeTradingStrategy} = require('./executeTradingStrategy')
const fs = require('fs');
const request = require('request')

app.get('/',(req,res)=>{
    res.send("Trading Platform")
})

app.get('/trading',async(req,res)=>{
    const { companyTiker, averagePrice,threshold}= req.query

    let str = "";
    let thresholdValue = parseFloat(threshold); 
    let averagePriceValue = parseFloat(averagePrice) // example reference price 0.7 96.5  11947.4
    let accountBalance = 1000; 
      let brokerageBuyFee = [{percentage:0.03},{amount :20}]
    let brokerageSellFee = [{percentage:0.03},{amount :20}]
    let tradeMarketData;

    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${companyTiker}&interval=5min&outputsize=full&apikey=DIYPNSKCANYW21CM&datatype=json`;    
        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
            console.log('Error:', err);
            } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
            } else {
                tradeMarketData = data
                str = executeTradingStrategy(tradeMarketData,thresholdValue,averagePriceValue,accountBalance,str,brokerageBuyFee,brokerageSellFee);
            }
        })

        setTimeout(() => {
            res.send(str);
        }, 5000);
})

app.listen(3000,()=>{
    console.log("Connected to server");
})
