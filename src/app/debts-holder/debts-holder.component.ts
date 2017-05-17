import { Component, OnInit } from '@angular/core';

import { Utility } from '../utilities/utility.service';

import { Debt, DebtFormatted } from '../utilities/debt';


@Component({
    selector: 'app-debts-holder',
    templateUrl: './debts-holder.component.html',
    styleUrls: ['./debts-holder.component.css']
})
export class DebtsHolderComponent implements OnInit {


    allDebts: Debt[] = [ new Debt(null, null, null, null, null, null, null, null, false) ]
    allDebtsFormatted: DebtFormatted[] = [ new DebtFormatted("", "", "", "", "", "") ]

    totals: any = {
        'totalDebtAmount': 0,
        'totalRepayments': 0,
        'totalRepayTerm': 0,
        'totalCostOfCredit': 0
    }

    constructor(private utilities: Utility) { }

    ngOnInit() {
        this.allDebts.push(new Debt(null, null, null, null, null, null, null, null, false))
        this.allDebtsFormatted.push(new DebtFormatted("", "", "", "", "", ""))
    }

    debtUpdated(data) {
        // set debt data to correct array item
        this.allDebts[data.index] = data.debt
        // recalculate total debts
        this.calculateTotalDebts(this.allDebts)
    }
    
    addNewDebt() {
        this.allDebts.push(new Debt(null, null, null, null, null, null, null, null, false))
        this.allDebtsFormatted.push(new DebtFormatted("", "", "", "", "", ""))
    }

    deleteDebt(index:number) {
        this.allDebts.splice(index, 1);
        this.calculateTotalDebts(this.allDebts)
    }

    calculateTotalDebts(debts: Debt[]) {
        this.totals.totalDebtAmount = 0
        this.totals.totalRepayments = 0
        this.totals.totalRepayTerm = 0
        this.totals.totalCostOfCredit = 0;

        let repayTermArray: number[] = []

        for (let debt of debts) {
            if (debt.debtConfirmed){
                this.totals.totalDebtAmount += debt.amount
                this.totals.totalRepayments += debt.monthlyRepay
                this.totals.totalCostOfCredit += debt.costOfCredit

                repayTermArray.push(debt.term)
                this.totals.totalRepayTerm = Math.max(...repayTermArray)
            }
        }
    }

    

}
