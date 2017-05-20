import { Component, OnInit } from '@angular/core';

import { Utility } from '../utilities/utility.service';

import { Debt, DebtFormatted } from '../utilities/debt';


@Component({
    selector: 'app-debts-holder',
    templateUrl: './debts-holder.component.html',
    styles: [``]
})
export class DebtsHolderComponent implements OnInit {

    /**
     * Array of debt objects
    */
    allDebts: Debt[] = [ new Debt(null, null, null, null, null, null, null, null, false) ]
    /**
     * Array of debt objects holding formated debt values
    */
    allDebtsFormatted: DebtFormatted[] = [ new DebtFormatted("", "", "", "", "", "") ]

    /**
     * Object which holds total amounts for all confirmed debts
    */
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

    /**
     * Updates individual debt and recalculates total amounts
    */
    debtUpdated(data) {
        // set debt data to correct array item
        this.allDebts[data.index] = data.debt
        // recalculate total debts
        this.calculateTotalDebts(this.allDebts)
    }
    
    /**
     * Adds a new debt object and formatted debt object
    */
    addNewDebt() {
        this.allDebts.push(new Debt(null, null, null, null, null, null, null, null, false))
        this.allDebtsFormatted.push(new DebtFormatted("", "", "", "", "", ""))
    }

    /**
     * Deletes the debt provided in event and recalculates total debts
    */
    deleteDebt(index:number) {
        this.allDebts.splice(index, 1);
        this.calculateTotalDebts(this.allDebts)
    }

    /**
     * Provided an array of debts the function will loop through each and update totals object
    */
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
