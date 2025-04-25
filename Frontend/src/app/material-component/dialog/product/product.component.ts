import { Component, Inject, OnInit,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  reponseMessage: any;
  categories: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,

    private formBuider: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductComponent>,
    private categoryService: CategoryService,
  private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.productForm = this.formBuider.group({
      name:[null,[Validators.required,Validators.pattern(GlobalConstants.nameRegex)]],
      categoryId:[null,[Validators.required]],
      price:[null,[Validators.required]],
      description:[null,Validators.required]
    });
    
    if(this.dialogAction.action === "Edit"){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response:any)=>{
      this.categories = response;
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.reponseMessage = error.error?.message;
      }else{
        this.reponseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error)
    })
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }else{
      this.add();
    }
  }

  edit(){
    var formData = this.productForm.value;
    var data = {
      id: this.dialogAction.data.id,
      name: formData.name,
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description
    }

    this.productService.add(data).subscribe((reponse:any)=>{
      this.dialogRef.close();
      this.onEditProduct.emit();
      this.reponseMessage = reponse.message;
      this.snackbarService.openSnackBar(this.reponseMessage,"Thành công");
    },(error)=>{console.log(error);
      if(error.error?.message){
        this.reponseMessage = error.error?.message;
      }else{
        this.reponseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error)
    })
  }


  add(){
    var formData = this.productForm.value;
    var data = {
      name: formData.name,
      categoryId:formData.categoryId,
      price:formData.price,
      description:formData.description
    }

    this.productService.add(data).subscribe((reponse:any)=>{
      this.dialogRef.close();
      this.onAddProduct.emit();
      this.reponseMessage = reponse.message;
      this.snackbarService.openSnackBar(this.reponseMessage,"success");
    },(error)=>{console.log(error);
      if(error.error?.message){
        this.reponseMessage = error.error?.message;
      }else{
        this.reponseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.reponseMessage,GlobalConstants.error)
    })
  }

}
