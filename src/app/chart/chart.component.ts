import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewService } from '../new.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  storearr:any=[];
  pagedata:any="0";
  constructor(private router:Router,private service:NewService, private toster:ToastrService) { }

  ngOnInit(): void {
    this.getCollegesdata(this.pagedata)
  }
 
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
}


  getCollegesdata(pdata:any) {
    this.service.register(pdata).subscribe(
      data => {
        this.storearr = data['products']
        
      },
      (error) => {

      }
    )
  }

hiddenItems:any={};
cardArr:any=[];

addtocart(item:any){
  if(localStorage.getItem("cart")){
    const data = localStorage.getItem("cart");
    this.cardArr = JSON.parse(data);

    const pushitem = {
      id:item.id,
      images:item.images[0],
      title:item.title,
      qty:1,
      description:item.description,
      price:item.price,
      tprice:item.price
    }
    this.cardArr.push(pushitem);
    this.toster.success("Item add to card successful!!")
  }
  else{
    const pushitem = {
      id:item.id,
      images:item.images[0],
      title:item.title,
      qty:1,
      description:item.description,
      price:item.price,
      tprice:item.price
    }
    this.cardArr.push(pushitem);
    this.toster.success("Item add to card successful!!")
  }
  localStorage.setItem("cart",JSON.stringify(this.cardArr))
}

navigate(){
  this.router.navigate(["/cart"]);
}

one:any=0;
two:any=10;
three:any=20;
four:any=30;
five:any=40;
six:any=50;
seven:any=60;
eight:any=70;
nine:any=80;
ten:any=90;

page(page:any){
  this.getCollegesdata(page);
}

}

