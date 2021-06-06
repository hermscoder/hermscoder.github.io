import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./_guards/auth.guard";
import {ListPostsComponent} from "./post/list-posts/list-posts.component";
import {PostComponent} from "./post/post/post.component";
import {PortfolioComponent} from "./portfolio/portfolio/portfolio.component";

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'posts', component: ListPostsComponent },
      { path: 'posts/:id', component: PostComponent },
      { path: 'portfolio', component: PortfolioComponent },
      // { path: 'taskDetails/:id', component: TaskSomeoneDetailComponent, resolve: {taskSomeone: TaskSomeoneDetailResolver} },
    ]
  }
];
