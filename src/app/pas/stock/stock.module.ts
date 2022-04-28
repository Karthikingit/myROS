import { NgModule } from '@angular/core';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from '../stock/stock.component';


@NgModule({
  declarations: [StockComponent],
  imports: [
    StockRoutingModule,
  ],
})
export class StockModule { }
