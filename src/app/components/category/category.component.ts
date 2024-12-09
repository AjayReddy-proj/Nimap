import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  category:any=[];
 modalTitle="";
  categoryId=0;
  categoryName="";
  
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.refreshList();
  }
  
  refreshList(){
    this.http.get<any>(environment.baseUrl +"api/Category").subscribe(
      Response => {
        this.category = Response;
      }
    )
  }
  addClick(){
    this.modalTitle = "Add Category";
    this.categoryId = 0;
    this.categoryName=""
  }
  createClick(){
    var val ={
      categoryId:this.categoryId,
      categoryName:this.categoryName
    };
    this.http.post(environment.baseUrl+"api/Category",val).subscribe(
      resp => {
        alert(resp.toString());
        this.refreshList();
      }
    )
  }
  editClick(cat:any){
    this.modalTitle="Edit Category";
    this.categoryId=cat.categoryId;
    this.categoryName=cat.categoryName
  }
  updateClick(){
    var val = {
      categoryId:this.categoryId,
      categoryName:this.categoryName
    }
    this.http.put(environment.baseUrl + "api/Category",val)
                              .subscribe( response =>{
                                alert(response.toString());
                                this.refreshList()
                              }
    )
  }
  deleteClick(id:any){
    if(confirm('Are you sure to delete ?')){
      this.http.delete(environment.baseUrl+'api/Category?id='+id).subscribe(response => {
        alert(response.toString());
        this.refreshList();
      
      })
    }
  }
 

}
