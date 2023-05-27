import { Component, OnInit } from '@angular/core';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  ;
@Component({
  selector: 'app-aaa',
  templateUrl: './aaa.component.html',
  styleUrls: ['./aaa.component.css']
})
export class AaaComponent implements OnInit {

  ngOnInit(): void {

      }


       externalDataRetrievedFromServer:any = [
        { name: 'Bartessssssssss ssssssssss  ssssssssssss sssssssssssssssssss sssssssssssssssssssssssssk', age: 34, hhy:122 },
        { name: 'John', age: 27,hhy:122 },
        { name: 'Elizabeth', age: 30,hhy:122 },
    ];
    
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
      this.table(this.externalDataRetrievedFromServer, ['name', 'age'],)
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
     }  


  }


