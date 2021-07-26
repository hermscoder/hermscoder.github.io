import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ListPostsComponent} from "./post/list-posts/list-posts.component";
import {PostComponent} from "./post/post/post.component";
import {PostResolver} from "./_resolvers/PostResolver";
import {RouteData} from "./_models/route-data";
import {WritePostComponent} from "./post/write-post/write-post.component";
import {ProfileResolver} from "./_resolvers/ProfileResolver";
import {EditProfileComponent} from "./profile/edit-profile/edit-profile.component";

export const ROUTES = {
  HOME: { url: '', title: 'Home' },
  LIST_POSTS: { url: 'posts', title: 'Posts' },
  POST_DETAILS: { url: 'posts/', title: 'Post' },
  WRITE_POST: { url: 'posts/write', title: 'Write post' },
  EDIT_POST: { url: 'posts/edit/', title: 'Edit post' },
  PORTFOLIO: { url: 'portfolio', title: 'Portifolio' },
  EDIT_PROFILE: { url: 'portfolio/edit', title: 'Edit Portifolio' },
  all(): RouteData[] {
    return [this.HOME,
            this.LIST_POSTS,
            this.POST_DETAILS,
            this.WRITE_POST,
            this.EDIT_POST,
            this.PORTFOLIO]
  },
  isItHomeRoute(url: string){
    let anchorIndex = url.indexOf('#');
    if(anchorIndex > -1) {
      url = url.substr(0, url.indexOf('#'));
    }
    return url.replace('/','') === this.HOME.url;
  }
};


export const appRoutes: Routes = [
  { path: ROUTES.HOME.url, component: HomeComponent, resolve: { profile: ProfileResolver } },
  {
    path: '',
    children: [
      { path: ROUTES.LIST_POSTS.url, component: ListPostsComponent },
      { path: ROUTES.WRITE_POST.url, component: WritePostComponent,canActivate: [AuthGuard] },
      { path: ROUTES.EDIT_POST.url + ':id', component: WritePostComponent, resolve: { post: PostResolver }, canActivate: [AuthGuard]},
      { path: ROUTES.POST_DETAILS.url + ':id', component: PostComponent, resolve: { post: PostResolver }},
      { path: ROUTES.EDIT_PROFILE.url, component: EditProfileComponent, resolve: { profile: ProfileResolver }, canActivate: [AuthGuard]  },
    ]
  },
  { path: "**", redirectTo: ROUTES.HOME.url, pathMatch: "full" }
];


