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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxWebstorageModule} from "ngx-webstorage";
import {CommonsModule} from "./commons";
import {HttpClientInterceptor} from "./_interceptors/http-client-interceptor";
import { PostCardComponent } from './post/post-card/post-card.component';
import {SafeHtmlPipe} from "./_pipes/safe-html-pipe";
import {HtmlToPlaintextPipe} from "./_pipes/html-to-plaintext-pipe";
import {DateFormatPipe} from "./_pipes/date-format-pipe";
import {PostResolver} from "./_resolvers/post-resolver";
import { WritePostComponent } from './post/write-post/write-post.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {
  faArrowCircleLeft,
  faBackspace,
  faBackward, faCheck,
  faCheckSquare, faChevronCircleLeft,
  faChevronLeft,
  faPen,
  faPenSquare, faShareAlt, faShareAltSquare,
  faSquare
} from "@fortawesome/free-solid-svg-icons";
import {faStackOverflow, faGithub, faMedium, faCodepen, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {ProfileResolver} from "./_resolvers/profile-resolver";
import {ErrorInterceptor, ErrorInterceptorProvider} from "./_services/error.interceptor";
import { ExperiencesComponent } from './portfolio/experiences/experiences.component';
import {NgxPageScrollModule} from "ngx-page-scroll";
import {NgxPageScrollCoreModule} from "ngx-page-scroll-core";
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import {DatePipe} from "@angular/common";
import { ProjectsComponent } from './portfolio/projects/projects.component';
import {DndDirective} from "./commons/directives/dnd.directive";
import { LinkedinCallbackComponent } from './callbacks/linkedin-callback/linkedin-callback.component';
import { ShareLinkedinComponent } from './post/share-linkedin/share-linkedin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    ListPostsComponent,
    PostComponent,
    PostCardComponent,
    SafeHtmlPipe,
    HtmlToPlaintextPipe,
    DateFormatPipe,
    WritePostComponent,
    ExperiencesComponent,
    EditProfileComponent,
    ProjectsComponent,
    LinkedinCallbackComponent,
    ShareLinkedinComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    CommonsModule,
    AngularEditorModule,
    FontAwesomeModule,
    NgxPageScrollModule,
    NgxPageScrollCoreModule.forRoot({duration: 500, scrollOffset: 100})
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true},
    ErrorInterceptorProvider,
    PostResolver,
    ProfileResolver,
    DateFormatPipe
  ],
  exports: [
    DndDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSquare, faCheckSquare, faSquare, faCheckSquare, faStackOverflow, faGithub, faLinkedin, faTwitter, faPen, faPenSquare, faArrowCircleLeft, faCheck, faShareAltSquare, faShareAlt);
  }
}
