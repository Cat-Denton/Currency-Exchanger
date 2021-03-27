import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRateService from './exchange-rate-service';

async function makeApiCall(currency) {
  const response = await ExchangeRateService.getRate(currency);
}

$("#currency-choice").submit(function() {

});
