import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent } from './index/main.component';
import { MainRoutingModule } from './main-routing.module';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [
    MainComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    MainRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
})
export class MainModule { }
