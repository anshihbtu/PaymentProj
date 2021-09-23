import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Cust } from './../cust';
import { UserService } from './../user.service';
import { Bank } from './../bank';

import { DateFilterFn } from '@angular/material/datepicker';



import { Transaction } from '../transaction';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {


  weekendsDatesFilter =  (d: Date | null):boolean =>  {
    if(d!=null)
    {
    const day = d.getDay();
  
    /* Prevent Saturday and Sunday for select. */
    return day !== 0 && day !== 6 ;
    }
    else
    {
      return false
    }
  }

  bic: any
  customerId: any
  cid: any;

  num = new FormGroup(
    {
      date :new FormControl('', Validators.required),
      customerId: new FormControl('', Validators.required)
    }
  )
  custForm = new FormGroup({

    name: new FormControl('', Validators.required),
    balance: new FormControl('', Validators.required),
    overdraft: new FormControl('', Validators.required)
  });

  ban = new FormGroup(
    {
      bic: new FormControl('', Validators.required)
    }
  )
  banForm = new FormGroup({

    name: new FormControl('', Validators.required)

  });
  status: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  cu = 5
  h: string = ""
  p: boolean = false
  saveId() {

    let cu = this.num.controls['customerId'].value
    this.userService.getCustById(cu)
      .subscribe(cust => {
        this.customerId = cust.customerId
        this.custForm.setValue({ name: cust.name, balance: cust.balance, overdraft: cust.overdraft });

      },
        (error) => {
          alert("Account not found");
        }

      );

  }

  saveban() {
    let bu = this.ban.controls['bic'].value

    this.userService.getRecById(bu)
      .subscribe(bank => {
        this.bic = bank.bic
        this.banForm.setValue({ name: bank.name });
      },
        (error) => {
          alert("Bank not found");
        });
  }


  thirdForm = new FormGroup(
    {
      receiver_name: new FormControl('', Validators.required),
      pno: new FormControl('', Validators.required),
      ttype: new FormControl('Customer'),
      mcode: new FormControl('CHQB')


    }
  )
  calc = new FormGroup(
    {
      tamt: new FormControl('', Validators.required)
    }
  )
  fForm = new FormGroup(
    {
      tf: new FormControl('', Validators.required),
      cb: new FormControl('', Validators.required)
    }
  )
  res: number = 0
  r: number = 0
  y: number = 0
  mon: number = 0
  trans: number = 0
  cal() {
    let mon = this.custForm.controls['balance'].value
    let trans = this.calc.controls['tamt'].value
    if (trans > mon) {
      alert("Not sufficient balance ")
    }
    else {
      let res = 0.25 * trans
      let y = +res + +trans
      let r = +mon - +y
      this.fForm.controls['tf'].setValue(res);
      this.fForm.controls['cb'].setValue(r);
    }
  }


  onSubmit() {
    if (this.fForm.valid && this.num.valid && this.thirdForm.valid && this.calc.valid && this.ban.valid) {



      let data = new Transaction(this.num.controls['customerId'].value, this.ban.controls['bic'].value, this.thirdForm.controls['receiver_name'].value
        , this.thirdForm.controls['pno'].value, this.thirdForm.controls['ttype'].value, this.thirdForm.controls['mcode'].value,
        this.calc.controls['tamt'].value, this.fForm.controls['tf'].value, this.fForm.controls['cb'].value,this.num.controls['date'].value);



      this.userService.createTransaction(data)
        .subscribe(result => {
          console.warn("result", result)

          this.num.reset();
          this.thirdForm.reset();
          this.ban.reset();
          this.calc.reset();
          this.fForm.reset();
          this.custForm.reset();
          this.banForm.reset();

        });
      alert(' Transaction successful');
    }
    else {
      alert("All fields are mandatory");
    }
  }
  


 
 onCheck()
 {
  let nm= this.thirdForm.controls['receiver_name'].value
 
  let i="jj"
 
  if (i.includes(nm)==true)
  {
 alert("Name present in SDN")
  }
  else{
    alert("Continue")
  }
 }
 }
  
 
