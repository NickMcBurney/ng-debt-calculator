
/**
 * Debt class
 * used to hold individual debt data 
*/

export class Debt {
    constructor(
        public amount: number,
        public type: string,
        public term: number,
        public monthlyRepay: number,
        public apr: number,
        public deposit: number,
        public totalRepaid: number,
        public costOfCredit: number,
        public debtConfirmed: boolean
    ) {  }
}

/**
 * Debt Formatted class
 * used to hold individual formatted debt data 
*/
export class DebtFormatted {
    constructor(
        public amount: string,
        public monthlyRepay: string,
        public apr: string,
        public deposit: string,
        public totalRepaid: string,
        public costOfCredit: string
    ) {  }
}