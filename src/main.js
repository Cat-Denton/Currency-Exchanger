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
  $("#showErrors").text(`There was an error: ${error}`);
}

function convert (amount,currency1,currency2) {
  return (amount/currency1*currency2).toFixed(2);
}

let currency = "USD";
ExchangeRateService.getRate(currency)
  .then(function(currencyResponse) {
    if (currencyResponse instanceof Error) {
      throw Error(`Currency Exchange API error: ${currencyResponse.message}`);
    }
    const exchangeRates = currencyResponse.conversion_rates;
    fillDropDown(exchangeRates);
    $("#money").click(()=> {
      const amount = $("#amount").val();
      const selection = $("#currency").val();
      const currency1 = exchangeRates[currency];
      const currency2 = exchangeRates[selection];
      $("#convertedCurrency").text(convert(amount,currency1,currency2));
      event.preventDefault();
    });
  })
  .catch(function(error) {
    showErrors(error.message);
  });
