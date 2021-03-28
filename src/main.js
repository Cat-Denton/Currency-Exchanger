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

let currency = "USD";
ExchangeRateService.getRate(currency)
  .then(function(currencyResponse) {
    if (currencyResponse instanceof Error) {
      throw Error(`Currency Exchange API error: ${currencyResponse.message}`);
    }
    const exchangeRates = currencyResponse.conversion_rates;
    console.log(exchangeRates)
    fillDropDown(exchangeRates);
  })
  .catch(function(error) {
    showErrors(error.message)
  })
