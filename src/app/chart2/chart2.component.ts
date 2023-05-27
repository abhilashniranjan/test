import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  ;
import { NewService } from '../new.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css']
})
export class Chart2Component implements OnInit {


  cartarr:any=[];
  totalsum:any="";
  constructor(private router:Router,private service:NewService,private toster:ToastrService) { 
 
  }

  ngOnInit(): void {
const data =(localStorage.getItem("cart"));
this.cartarr = JSON.parse(data);
this.totalsum = this.cartarr.map(a => a.tprice).reduce(function(a, b)
{
  return a + b;
});
  }
 


  po(id:any){
    const updates = this.cartarr.find(m=>m.id==id);
    updates.qty = updates.qty + 1;
    updates.tprice = updates.price * updates.qty;

    this.totalsum = this.cartarr.map(a => a.tprice).reduce(function(a, b)
    {
      return a + b;
    });

 localStorage.setItem('cart',JSON.stringify(this.cartarr));
  }

  no(id:any,qty:any){
    if(qty==1){
   alert("not decress qty 1")
    }
    else{
      const updates = this.cartarr.find(m=>m.id==id);
      updates.qty = updates.qty - 1;
      updates.tprice = updates.price * updates.qty;

    this.totalsum = this.cartarr.map(a => a.tprice).reduce(function(a, b)
    {
      return a + b;
    });

    }
    localStorage.setItem('cart',JSON.stringify(this.cartarr));
  }


  home(){
    console.log(this.cartarr)
    this.router.navigate(["/"]);
    
  }


urlnavigate:any="";
bol1:boolean=true;
bol2:boolean=false;

   data:any=[];
   getPDF(){
    const datanew =(localStorage.getItem("cart"));
    this.data = JSON.parse(datanew);
    const temDta = {
    data:this.data
    }
   
      this.service.postlocation(temDta).subscribe((data:any) => {
      this.urlnavigate = data.url;
      setTimeout(()=>{
        this.bol1 = false;
        this.bol2 = true;
      },1000);
          },(error) => {
            this.toster.error("Something went wrong");
          })

          
    }


    delete(id:any){
if(confirm("are you delete Item")){
  for (let i = 0; i < this.cartarr.length; i++) {
    if(this.cartarr[i].id == id){
      this.cartarr.splice(i,1)
    }
    
    localStorage.setItem('cart',JSON.stringify(this.cartarr));
  
  }
  const data =(localStorage.getItem("cart"));
  this.cartarr = JSON.parse(data);
  if(this.cartarr.length){
    this.totalsum = this.cartarr.map(a => a.tprice).reduce(function(a, b)
    {
      return a + b;
    });
  }else{
    this.totalsum = 0;
  }
}



    }







   buildTableBody(data, columns) {
      var body = [];
  
      body.push(columns);
  
      data.forEach(function(row) {
          var dataRow = [];
  
          columns.forEach(function(column) {
              dataRow.push(row[column].toString());
          })
  
          body.push(dataRow);
      });
  
      return body;
  }
  
   table(data, columns) {
      return {
          table: {
              headerRows: 1,
              body: this.buildTableBody(data, columns)
          }
      };
  }



    async generatePDF() {  
      var dd = {
       content: [
         {text: 'Order Details', style: 'sec'},
         this.table(this.cartarr, ['title','description', 'price', 'qty', 'tprice']),
         {
          columns: [
            {   
                margin: [0,10],
               fontSize:15,
                text:'Total Amount:'+this.totalsum
            },
               
          ]
        
        },
     ],
     styles: {
     sec:{
         fontSize:26,
         marginTop:10,
         marginBottom:10,
         alignment: 'center',
     }
   }
      }
          pdfMake.createPdf(dd).open();  
          pdfMake.createPdf(dd).download();

        }  



}
