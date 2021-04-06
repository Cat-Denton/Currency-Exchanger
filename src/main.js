import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './exchange-rate-service';

function fillDropDown(rates) {
  let rateKeys = Object.keys(rates);
  rateKeys.forEach(element => $("#currency").append(`<option>${element}</option>`));
}

function showErrors(error) {
  $("#showErrors").show;
  $("#showErrors").text(`There was an error: ${error}`);
}

function convert (amount,currency1,currency2) {
  return (amount/currency1*currency2).toFixed(2);
}

$(document).ready(function() {
  
  
  let currency = "USD";
  ExchangeRateService.getRate(currency)
    .then(function(currencyResponse) {
      if (currencyResponse instanceof Error) {
        throw Error(`Currency Exchange API error: ${currencyResponse.message}`);
      }
      const exchangeRates = currencyResponse.conversion_rates;
      fillDropDown(exchangeRates);
      $("#money").click(()=> {
        $("#hiddenResult").hide();
        $("#hiddenError").hide();
        event.preventDefault();
        const amount = $("#amount").val();
        const selection = $("#currency").val();
        const currency1 = exchangeRates[currency];
        const currency2 = exchangeRates[selection];
        if (currency2 === undefined) {
          $("#hiddenError").show();
          $("#showErrors").text("Please choose a valid currency and try again.");
        } else {
          $("#convertedCurrency").text(convert(amount,currency1,currency2));
          $("#hiddenResult").show();
        }
      });
    })
    .catch(function(error) {
      showErrors(error.message);
    });
});
