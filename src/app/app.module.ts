import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {CardModule} from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';

import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';

import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { HomeComponent } from './home/home.component';

import { NgxFileDropModule } from 'ngx-file-drop';
import { DashboardComponent } from './dashboard/dashboard.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    ButtonModule,
    SelectButtonModule,
    CalendarModule,
    TableModule,
    TabViewModule,
    AccordionModule,
    MenubarModule,
    DialogModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    NgxFileDropModule
  ],
  providers: [
    DatePipe,
    ConfirmationService,
    MessageService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
