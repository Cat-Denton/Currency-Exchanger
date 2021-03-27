import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './exchange-rate-service';

function fillDropDown(response) {
  let rateKeys = Object.keys(response.conversion_rates);
  rateKeys.forEach(element => $("#currency").append(`<option>${element}</option>`));
}

async function makeApiCall(currency) {
  const response = await ExchangeRateService.getRate(currency);
  fillDropDown(response);
}

makeApiCall("USD")

$("#currency-choice").submit(function() {

});
