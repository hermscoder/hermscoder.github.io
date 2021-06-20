import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ListPostsComponent} from "./post/list-posts/list-posts.component";
import {PostComponent} from "./post/post/post.component";
import {PortfolioComponent} from "./portfolio/portfolio/portfolio.component";
import {PostResolver} from "./_resolvers/PostResolver";
import {RouteData} from "./_models/route-data";
import {WritePostComponent} from "./post/write-post/write-post.component";

export const ROUTES = {
  HOME: { url: '', title: 'Home' },
  LIST_POSTS: { url: 'posts', title: 'Posts' },
  POST_DETAILS: { url: 'posts/', title: 'Post' },
  WRITE_POST: { url: 'posts/write', title: 'Write post' },
  EDIT_POST: { url: 'posts/edit', title: 'Edit post' },
  PORTFOLIO: { url: 'portfolio', title: 'Portifolio' },
  all(): RouteData[] {
    return [this.HOME,
            this.LIST_POSTS,
            this.POST_DETAILS,
            this.WRITE_POST,
            this.EDIT_POST,
            this.PORTFOLIO]
  }
};


export const appRoutes: Routes = [
  { path: ROUTES.HOME.url, component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: ROUTES.LIST_POSTS.url, component: ListPostsComponent },
      { path: ROUTES.WRITE_POST.url, component: WritePostComponent },
      { path: ROUTES.EDIT_POST.url + ':id', component: WritePostComponent, resolve: { post: PostResolver }},
      { path: ROUTES.POST_DETAILS.url + ':id', component: PostComponent, resolve: { post: PostResolver }},
      { path: ROUTES.PORTFOLIO.url, component: PortfolioComponent },
      // { path: 'taskDetails/:id', component: TaskSomeoneDetailComponent, resolve: {taskSomeone: TaskSomeoneDetailResolver} },
    ]
  }
];


