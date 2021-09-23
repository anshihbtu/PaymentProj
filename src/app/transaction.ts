export class Transaction
{
    public sender_acc_no:string;
   public tbic:string;

   public receiver_name:string;
   public pno:string;
   public ttype:string;
   public mcode:string;
   public tamt:number;
   public tf:number;
   public cb:number;
   public date:Date;
  
   constructor(sender_acc_no:string , tbic :string ,  receiver_name: string ,
    pno :string , ttype:string , mcode:string , tamt :number, tf:number , cb:number, date:Date )
    {
        this.sender_acc_no=sender_acc_no;
     
        
        this.tbic=tbic;
        
        this.receiver_name=receiver_name;
        this.pno=pno;
        this.ttype=ttype;
        this.mcode=mcode;
        this.tamt=tamt;
        this.tf=tf;
        this.cb=cb;
        this.date=date
    }
}


