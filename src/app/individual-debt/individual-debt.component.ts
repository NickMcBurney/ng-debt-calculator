import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';

import { Utility } from '../utilities/utility.service';

import { Debt, DebtFormatted } from '../utilities/debt';

@Component({
    selector: 'app-individual-debt',
    templateUrl: './individual-debt.component.html',
    styles: [``],
})
export class IndividualDebtComponent implements OnInit {
    /**
     * Index number prodived by parent component
    */
    @Input() index: number;
    /**
     * Debt object used to store individual debt information provided by Parent
    */
    @Input() debt: Debt;
    /**
     * Outputs onUpdated() event which triggers total amounts recalculations
    */
    @Output() onUpdated = new EventEmitter<any>();
    /**
     * Outputs debtDeleted() event which removes debt from debts array and triggers total amounts recalculations
    */
    @Output() debtDeleted = new EventEmitter<any>();
    /**
     * Checks if component debt form is valid
    */
    @ViewChild('debtForm') debtForm;
    /**
     * Boolean which holds debt form valid state
    */
    debtValid: boolean = null;
    /**
     * Boolean which holds debt confirmed state
    */
    debtConfirmed: boolean = false;
    /**
     * Object holding formatted debt values
    */
    debtFormatted: DebtFormatted = new DebtFormatted("", "", "", "", "", "")

    /**
     * constructor includes utilities services which are used in the component template
    */
    constructor(public utilities: Utility) {
    }
    
    /**
     * Confirms the debt and trigger saveDebt function
    */
    confirmDebt(index: number){
        this.debtConfirmed = true;
        this.saveDebt(index)
    }

    /**
     * Unconfirms debt and trigger saveDebt function
    */
    editDebt(index: number){
        this.debtConfirmed = false;
        this.saveDebt(index)
    }

    /**
     * Emit debtDeleted event to {@link DebtsHolderComponent}
     * DebtsHolderComponent will then remove this debt from debts array
    */
    deleteDebt(index: number){
        this.debtDeleted.emit(index);
    }

    
    /**
     * SAVE THE DEBT
     * calculate debt term if type = credit card
     * calculate debt total repaid
     * calculate debt cost of credit
     * create debt package
     * send debt package to parent component (via eventEmitter)
    */
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
