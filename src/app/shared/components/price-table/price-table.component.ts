import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-table',
  templateUrl: './price-table.component.html',
  styleUrls: ['./price-table.component.scss'],
})
export class PriceTableComponent  implements OnInit {

  @Input() pricingBox: {name: string, price: number, features: string[]};

  constructor() { }

  ngOnInit() {}

  onPurchase(curso: string) {
    console.log(`Purchase Clicked ${curso}`);
    //<a href="https://wa.me/34625126513?text={{textoWhatsApp}}">
  }

}
