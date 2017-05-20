import {Injectable } from '@angular/core';

@Injectable()
export class Utility {

	/**
	 * Format value to percentage
	 * @example
	 * formatPercent(15);
	 * returns "15%"
	 * @returns {string} Returns the value formatted as percentage
	*/
    public formatPercent(value:any):string {
		return value.replace(/%/g, "") + "%"
	}


	/**
	 * Format value to currency
	 * @example
	 * formatCurrency(2400);
	 * returns "£2,400"
	 * @returns {string} Returns the value formatted as currency
	*/
    public formatCurrency(value: any):string {
		value = value.replace(/,/g, "");
		value = value.replace(/£/g, "");
		value += '';
		let x = value.split('.');
		let x1 = x[0];
		let x2;
		if(x.length > 1 && x[1] != "00") {
			x2 = '.' + x[1];
		} else {
			x2 = ''
		}
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return "£" + x1 + x2;
	}
 

	/**
	 * Format months to length of time
	 * @example
	 * formatMonths(24);
	 * returns "2 years"
	 * @example
	 * formatMonths(30);
	 * returns "2½ years"
	 * @example
	 * formatMonths(32);
	 * returns "2 years and 8 months"
	 * @returns {string} Returns the value formatted as length of time
	*/
	public formatMonths(months: number):string {
		const years: number =  Math.floor(months / 12); // 1
		const remainingMonths: number = months % 12; 
		let formatted: string = "";
		
		if(remainingMonths >= 1 && years < 1)
			formatted = remainingMonths + " months"
		else if(years == 1 && remainingMonths < 1)
			formatted = years + " year"
		else if(years > 1 && remainingMonths < 1)
			formatted = years + " years"
		else if(years >= 1 && remainingMonths >= 1 && remainingMonths == 6)
			formatted = years + "½ years"
		else if(years >= 1 && remainingMonths >= 1)
			formatted = years + " years and " + remainingMonths + " months"
		else
			formatted = ""
				
		return formatted;
	}


	/**
	 * Unformat a string (currency or percentage)
	 * @example
	 * unformat("£2,000");
	 * returns 2000
	 * @example
	 * unformat("15%");
	 * returns 15
	 * @returns {number} Returns the formatted value as number
	*/
	public unformat(value: string):number{
		return Number(value.replace(/,/g, "").replace(/£/g, "").replace(/%/g, ""));
	}



	/**
	 * Calculate term
	 * @example
	 * calculateTerm(10,100,15);
	 * returns 7
	 * @returns {number} Returns number of months (unformatted)
	*/
	public calculateTerm(apr: number, amount:number, monthly:number):number{
		let $interestRate = apr,
		$creditBalance = amount,
		$monthlyRepayment = monthly;

		let nnn=(Math.log($monthlyRepayment)-Math.log($monthlyRepayment-($creditBalance*$interestRate)/1200))/Math.log(1+($interestRate/1200));
		
		let term = Math.round(Math.ceil(10*nnn) / 10);	
		
		if(isNaN(term))
			term = Math.round($creditBalance / $monthlyRepayment)

		return term
		
	}


	/**
	 * Calculate total repaid
	 * @example
	 * calculateTotalRepaid(100, 24);
	 * returns 2400
	 * @returns {number} Returns unformatted total repaid amount
	*/
	public calculateTotalRepaid(monthly:number, term: number):number{
		// calculate total paid
		const total = monthly * term;
		
		// if all fields filled show total paid
		if(monthly && term && !isNaN(total))
			return total
	}


	/**
	 * Calculate cost of credit
	 * Subtracts loan amount from the total repaid amount
	 * @example
	 * calculateTotalRepaid(1000, 0, 1500);
	 * returns 500
	 * @returns {number} Returns unformatted total cost of credit
	*/
	public calculateCostOfCredit(amount: number, deposit: number, totalRepaid: number):number{
		let cost:number = 0;
		if(deposit)
			cost = totalRepaid - (amount - deposit);
		else
			cost = totalRepaid - amount;

		// if all fields filled show total paid otherwise hide
		if(amount && totalRepaid && !isNaN(cost))
			return cost
	}
}


