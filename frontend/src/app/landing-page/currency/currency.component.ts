import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CurrencyService } from './currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CurrencyComponent {

  constructor(private currencyService : CurrencyService) { }

  currencies = [
    {
      name : "USD",
      outputName : "Dollar"
    },
    {
      name : "EUR",
      outputName : "Euro"
    },
    {
      name : "GBP",
      outputName : "Liră sterlină"
    },
    {
      name : "CHF",
      outputName : "Franc elvețian"
    },
  ]

  currency$ = this.currencyService.getCurrency('latest')
  previousCurrency$ = this.currencyService.getCurrency(this.currencyService.getPreviousDay())

}
