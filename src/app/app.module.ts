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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ListPostsComponent,
    PostComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
