import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';

import { Utility } from '../utilities/utility.service';

import { Debt, DebtFormatted } from '../utilities/debt';

@Component({
    selector: 'app-individual-debt',
    templateUrl: './individual-debt.component.html',
    styleUrls: ['./individual-debt.component.css'],
    //providers: [Utility]
})
export class IndividualDebtComponent implements OnInit {
    @Input() index: number;
    @Input() debt: Debt;
    @Output() onUpdated = new EventEmitter<any>();
    @Output() debtDeleted = new EventEmitter<any>();
    @ViewChild('debtForm') debtForm;

    debtConfirmed: boolean = false;
    debtValid: boolean = null;
    debtFormatted: DebtFormatted = new DebtFormatted("", "", "", "", "", "")

    constructor(public utilities: Utility) {
    }
    
    
    confirmDebt(index: number){
        this.debtConfirmed = true;
        this.saveDebt(index)
    }

    editDebt(index: number){
        this.debtConfirmed = false;
        this.saveDebt(index)
    }

    deleteDebt(index: number){
        this.debtDeleted.emit(index);
    }
    ////////////////////////////
    // SAVE THE DEBT
    ////////////////////////////
    // calculate debt term if type = credit card
    // calculate debt total repaid
    // calculate debt cost of credit
    // create debt package
    // send debt package to parent component (via eventEmitter)
    saveDebt(index: number) {        
        // calculate time to repay (if not provided e.g. credit card)
        if (this.debt.type == "Credit Card") {
            this.debt.term = this.utilities.calculateTerm(
                this.debt.apr, this.debt.amount, this.debt.monthlyRepay
            )
        }

        // calculate total repaid
        this.debt.totalRepaid = this.utilities.calculateTotalRepaid(
            this.debt.monthlyRepay, this.debt.term
        )

        // calculate cost of credit
        this.debt.costOfCredit = this.utilities.calculateCostOfCredit(
            this.debt.amount, this.debt.deposit, this.debt.totalRepaid
        )

        
        
        if(this.debtForm.valid)
            this.debtValid = this.debt.costOfCredit >= 0
        
        if(this.debtValid) {
            this.debt.debtConfirmed = this.debtConfirmed
            // create debt package with debt info and index no
            let debtPackage: Object = {
                'debt': this.debt,
                'index': index
            }

            // create onSubmitted event
            // and send debt package to parent component
            this.onUpdated.emit(debtPackage);
        }
    }

    ngOnInit() {
    }

}
