import {PostDetailsDto} from "../_models/post-details-dto";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {PostService} from "../_services/post.service";
import {catchError, map} from "rxjs/operators";
import {ResolvedData} from "../_models/resolved-data";
import {ROUTES} from "../routes";

@Injectable()
export class PostResolver implements Resolve<ResolvedData<PostDetailsDto>> {
  constructor(private postService: PostService,
              private router: Router/*, private alertify: AlertifyService*/) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<PostDetailsDto>>{
    // catch any errors, if we have problems, we redirect and print a message for the user
    return this.postService.getPost(route.params['id']).pipe(
      map((route) => new ResolvedData<PostDetailsDto>(route)),
      catchError(error => {
        this.router.navigate([ROUTES.LIST_POSTS.url]);
        return of(new ResolvedData<PostDetailsDto>(null, error));
        // this.alertify.error('Problem retrieving data');
      })
    );
  }

}
