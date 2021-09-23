export class Cust{
    public customerId: string;
    public name: string;
    public balance: number;
    public overdraft:string;
    constructor(customerId: string, name: string, balance: number, overdraft:string){
        this.customerId = customerId;
        this.name = name;
        this.balance = balance;
        this.overdraft=overdraft;
    }
}