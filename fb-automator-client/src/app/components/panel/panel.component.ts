import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Credential } from 'src/app/models/credentials';
import { CredentialService } from 'src/app/services/credential.service';
//import { CredentialService } from 'src/app/services/credential.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor(
    private cs: CredentialService
  ) { }

  @ViewChild('addTemplate', { static: false }) addTemplate!: TemplateRef<any> | null;
  @ViewChild('editTemplate', { static: false }) editTemplate!: TemplateRef<any> | null;

  credentials: Array<Credential> = new Array<Credential>();
  credential: Credential = new Credential();

  searhCredentials: Array<Credential> = new Array<Credential>();

  login!: string;
  paginationNum: number = 0;
  isEdit: boolean = false;
  
  addForm: FormGroup = new FormGroup({
    "login": new FormControl(),
    "password": new FormControl()
  });
  
  public get isLoginEmpty() {
    if (this.credentials.length > 0) return true;
    else return false;
  }

  public get isCredEmpty() {
    if (this.credentials.length == 0 && this.sended.length > 0) return true;
    else return false;
  }

  ngOnInit(): void {
    this.loadTemplate(false);
  }

  loadTemplate(value: boolean) {
    if (value == true) {
      return this.editTemplate;
    } else {
      return this.addTemplate;
    }
  }

  openEdit(credential: Credential) {
    this.isEdit = true;
    this.credential = credential;
    this.addForm.controls["login"].setValue(credential.login);
    this.addForm.controls["password"].setValue(credential.password);
  }

  editProduct() {
    if (this.addForm.controls["login"].value.trim() != '' && this.addForm.controls["password"].value.trim() != '') {
      const index = this.credentials.indexOf(this.credential, 0);
      this.credential.login = this.addForm.controls["login"].value;
      this.credential.password = this.addForm.controls["password"].value;
      this.credentials[index] = this.credential
      this.credential = new Credential();
      this.addForm.controls["login"].setValue("");
      this.addForm.controls["password"].setValue("");
      this.isEdit = false;
    }
  }

  addProduct() {
    if (this.addForm.controls["login"].value.trim() != '' && this.addForm.controls["password"].value.trim() != '') {
      this.credential.login = this.addForm.controls["login"].value;
      this.credential.password = this.addForm.controls["password"].value;
      this.credentials.push(this.credential);
      this.addForm.controls["login"].setValue("");
      this.addForm.controls["password"].setValue("");
      this.credential = new Credential();
    }
  }

  deleteProduct(credential: Credential) {
    const index = this.credentials.indexOf(credential, 0);
    if (index > -1) {
      this.credentials.splice(index, 1);
    }
    this.isEdit = false;
    this.addForm.controls["login"].setValue("");
    this.addForm.controls["password"].setValue("");

  }

  cancel() {
    this.credential = new Credential();
    this.addForm.controls["login"].setValue("");
    this.addForm.controls["password"].setValue("");
    this.isEdit = false;
  }

  sended: Array<Credential> = new Array<Credential>();

  sendData() {
    this.cs.sendCredentials(this.credentials)
    .subscribe(res => {
      this.sended = res;
      console.log(this.sended);
    });
    this.credentials = new Array<Credential>();
    this.credential = new Credential();
    this.addForm.controls["login"].setValue("");
    this.addForm.controls["password"].setValue("");
    this.isEdit = false;
  }
}
