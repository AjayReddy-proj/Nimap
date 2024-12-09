import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  category: any =[];
  products: any = [];
  modalTitle="";
  productId=0;
  productName="";
  categoryId=0;
  categoryName="";
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.refreshList();
  }
  
  refreshList(){
    this.http.get<any>(environment.baseUrl + "api/Product").subscribe(
      response => {
        this.products =response;
      }
    )
  }
  addClick(){
    this.modalTitle = "Add Product";
    this.productId = 0;
    this.productName="";
    this.categoryId = 0;
    this.categoryName=""
  }
  createClick(){
    var val ={
      productName:this.productName,
      categoryId:this.categoryId,
      categoryName:this.category.categoryName
    };
    this.http.post(environment.baseUrl+"api/Product",val).subscribe(
      resp => {
        alert(resp.toString());
        this.refreshList();
      }
    )
  }
  editClick(prod:any){
    this.modalTitle="Edit Product";
    this.productId= prod.productId;
    this.productName=prod.productName;
    this.categoryId=prod.categoryId;
    this.categoryName=prod.categoryName
  }
  updateClick(){
    var val = {
      productId:this.productId,
      productName:this.productName,
      categoryId:this.categoryId,
      categoryName:this.categoryName
    }
    this.http.put(environment.baseUrl + "api/Product",val)
                              .subscribe( response =>{
                                alert(response.toString());
                                this.refreshList()
                              }
    )
  }
  deleteClick(id:any){
    if(confirm('Are you sure to delete ?')){
      this.http.delete(environment.baseUrl+'api/Product?id='+id).subscribe(response => {
        alert(response.toString());
        this.refreshList();
      
      })
    }
  }
  

}
