import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewService {
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
// baseUri: string = "https://dummyjson.com/products?limit=10&skip=0";
  constructor(private http: HttpClient, private router: Router) { }

  postlocation(body: any) {
    return this.http.post("http://localhost:3000/download", body);
  }


  register(pagedata:any) {
    return this.http.get("https://dummyjson.com/products?limit=10+&skip="+pagedata);
  }
}
