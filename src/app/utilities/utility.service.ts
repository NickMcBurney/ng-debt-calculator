import {Injectable } from '@angular/core';

@Injectable()
export class Utility {

	/////////////////////////
	// FORMAT PERCENTAGES
	/////////////////////////
    public formatPercent(value:any) {
		return value.replace(/%/g, "") + "%"
	}


	/////////////////////////
	// FORMAT CURRENCY
	/////////////////////////
    public formatCurrency(value: any) {
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
 

	/////////////////////////
	// FORMAT MONTHS
	/////////////////////////
	public formatMonths(months: number) {
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


	/////////////////////////
	// UNFORMAT VALUES
	/////////////////////////
	public unformat(value: string) {
		return Number(value.replace(/,/g, "").replace(/£/g, "").replace(/%/g, ""));
	}



	/////////////////////////
	// CALCULATE TERM
	/////////////////////////
	public calculateTerm(apr: number, amount:number, monthly:number){
		let $interestRate = apr,
		$creditBalance = amount,
		$monthlyRepayment = monthly;

		let nnn=(Math.log($monthlyRepayment)-Math.log($monthlyRepayment-($creditBalance*$interestRate)/1200))/Math.log(1+($interestRate/1200));
		
		let term = Math.round(Math.ceil(10*nnn) / 10);	
		
		if(isNaN(term))
			term = Math.round($creditBalance / $monthlyRepayment)

		return term
		
	}


	/////////////////////////
	// CALCULATE TOTAL REPAID
	/////////////////////////
	public calculateTotalRepaid(monthly:number, term: number){
		// calculate total paid
		const total = monthly * term;
		
		// if all fields filled show total paid
		if(monthly && term && !isNaN(total))
			return total
	}


	/////////////////////////
	// CALCULATE CREDIT COST
	/////////////////////////
	public calculateCostOfCredit(amount: number, deposit: number, totalRepaid: number){
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


