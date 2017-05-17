import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Utility } from './utilities/utility.service';

import { AppComponent } from './app.component';
import { DebtsHolderComponent } from './debts-holder/debts-holder.component';
import { IndividualDebtComponent } from './individual-debt/individual-debt.component';



@NgModule({
  declarations: [
    AppComponent,
    DebtsHolderComponent,
    IndividualDebtComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [Utility],
  bootstrap: [AppComponent]
})
export class AppModule { }
