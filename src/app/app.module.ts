import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './auth/login/login.component';
import {RouterModule} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { ListPostsComponent } from './post/list-posts/list-posts.component';
import { PostComponent } from './post/post/post.component';
import { PortfolioComponent } from './portfolio/portfolio/portfolio.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxWebstorageModule} from "ngx-webstorage";
import {CommonsModule} from "./commons";
import {HttpClientInterceptor} from "./_interceptors/http-client-interceptor";
import { PostCardComponent } from './post/post-card/post-card.component';
import {SafeHtmlPipe} from "./_pipes/safe-html-pipe";
import {HtmlToPlaintextPipe} from "./_pipes/html-to-plaintext-pipe";
import {DateFormatPipe} from "./_pipes/date-format-pipe";
import {PostResolver} from "./_resolvers/PostResolver";
import { WritePostComponent } from './post/write-post/write-post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ListPostsComponent,
    PostComponent,
    PortfolioComponent,
    PostCardComponent,
    SafeHtmlPipe,
    HtmlToPlaintextPipe,
    DateFormatPipe,
    WritePostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    CommonsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true},
    PostResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
