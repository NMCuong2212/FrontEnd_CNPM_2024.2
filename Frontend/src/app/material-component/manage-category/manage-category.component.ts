import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { error } from 'console';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {

  displayedColumns: string[] = ['name','edit'];
  dataSource:any;
  reponseMessage:any;


  constructor( private categoryService:CategoryService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService,
    private router:Router,
    private dialog: MatDialog,
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.categoryService.getCategories().subscribe((response:any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error.error?.message);
      if(error.error?.message){
        this.reponseMessage = error.error?.message;
      }else{
        this.reponseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error);
    })
  }

  applyfilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterValue = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.data ={
      action: 'Add',
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values:any){
    const dialogConfig = new  MatDialogConfig();
    dialogConfig.data ={
      action: 'Edit',
      data:values
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();

    });
    const sub = dialogRef.componentInstance.onAddCategory.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDelete(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:"delete"+values.name+'product',
      confirmation:true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((reponse:any)=>{
      this.ngxService.start();
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }

  deleteProduct(id:any){
    this.productService.delete(id).subscribe((reponse:any)=>{
      this.ngxService.stop();
      this.tableData();
      this.reponseMessage = reponse?.message;
      this.snackbarService.openSnackBar(this.reponseMessage,"success");

    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.reponseMessage = error.error?.message;
      }else{
        this.reponseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error);
    })
  }

  onChange(status:any,id:any){
    this.ngxService.start();
    var data = {
      status:status.toString(),
      id:id
    }

    this.productService.updateStatus(data).subscribe((reponse:any)=>{
      this.ngxService.stop();
      this.reponseMessage = reponse?.message;
      this.snackbarService.openSnackBar(this.reponseMessage,"success");
       
    },(error:any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.reponseMessage = error.error?.message;
      }else{
        this.reponseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error);
    })
  }



}
