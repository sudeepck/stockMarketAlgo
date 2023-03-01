executeTradingStrategy =(tradeMarketData,threshold,averagePriceValue,accountBalance,str,brokeragebuyFee,brokerageSellFee) =>
{
    str +=`Date &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &emsp; &nbsp; &nbsp;&nbsp; BuyOrSell &nbsp;&nbsp; &nbsp;&nbsp;  avgPriceValue &emsp; current price &emsp; thresholdValue &emsp;  accountBalance &emsp; accountValue  &emsp; profitOrLoss <br/>`;
    let accountValue = accountBalance;
    let unchangedinitialBalance = accountBalance;

   let sellingPrice = 0 ,purchasePrice = 0 ,numShares = 0,buyed = 0;
   let numberofpurshaced = 0,numberofSelled =    0
    let previousBuyedValue = 0;
    let profit = 0;

  

         for (const timestamp in tradeMarketData["Time Series (5min)"]) {

            let High = tradeMarketData["Time Series (5min)"][timestamp]["2. high"]
            let Low = tradeMarketData["Time Series (5min)"][timestamp]["3. low"]
            let Date = timestamp

               let currentPriceValue = (parseInt(High) + parseInt(Low))/2
                let priceDifference = Math.abs(currentPriceValue - averagePriceValue);//129.5 -- 129.3 = 0.3

                console.log(priceDifference  +  " " + threshold)
                    // if sell  else buy
                    if (priceDifference > threshold && buyed == 1 && previousBuyedValue < currentPriceValue) {
                        flag = 1;
                        sellingPrice += currentPriceValue;
                        let brokeageFeeForSell = Math.min(brokerageSellFee[1].amount ,(currentPriceValue * brokerageSellFee[0].percentage));
                        brokeageFeeForSell=  brokeageFeeForSell.toFixed(1);

                        
                        accountBalance += currentPriceValue - brokeageFeeForSell
                        accountValue = accountBalance - brokeageFeeForSell
                        numShares++;
                        buyed --;
                        numberofSelled++;   
                        profit = previousBuyedValue < currentPriceValue ? "profit" :"loss";

                        str +=`${Date} &nbsp; &nbsp;  &nbsp; &nbsp; SELL &emsp;&emsp;&emsp;&emsp;&emsp;${[averagePriceValue]} &emsp;&emsp;&emsp;&emsp;&emsp;${[currentPriceValue.toFixed(2)]} &emsp;&emsp;&emsp;&emsp;&emsp; ${[threshold]} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  ${[accountBalance.toFixed(2)]} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${[accountValue.toFixed(2)]} &emsp; ${profit} <br/>`
                        // return {[Date] : "it's time to Sell the stock "}
                    } else if (priceDifference < threshold && accountBalance >= currentPriceValue && buyed == 0) {
                        previousBuyedValue = currentPriceValue;//94


                        let brokeageFeeForBuy = Math.min(brokeragebuyFee[1].amount,(currentPriceValue * brokeragebuyFee[0].percentage));
                       brokeageFeeForBuy  =brokeageFeeForBuy.toFixed(1)

                    
                        accountBalance -= currentPriceValue -brokeageFeeForBuy
                        accountValue = accountBalance + currentPriceValue -brokeageFeeForBuy

                        numShares++;
                        buyed++;
                        numberofpurshaced++;
                        flag =1;
                          str +=`${Date} &nbsp; &nbsp;  &nbsp; &nbsp; BUY &emsp;&emsp;&emsp;&emsp;&emsp;${[averagePriceValue]} &emsp;&emsp;&emsp;&emsp;&emsp;${[currentPriceValue.toFixed(2)]} &emsp;&emsp;&emsp;&emsp;&emsp; ${[threshold]} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ${[accountBalance.toFixed(2)]} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;${[accountValue.toFixed(2)]} <br/>`
                    } else {
                        flag = 0;
                    }
        }
    
        

        let finalBalance = accountBalance;
        console.log("numberofpurshaced = " + numberofpurshaced + "\t" + "numberofSelled ="  +numberofSelled )
        console.log("initialBalance = " +  unchangedinitialBalance +"\t"+ "finalBalance = " +  finalBalance);
    return str;
}


module.exports = {executeTradingStrategy}











