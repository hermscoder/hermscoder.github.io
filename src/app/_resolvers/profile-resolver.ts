import {PostDetailsDto} from "../_models/post-details-dto";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {PostService} from "../_services/post.service";
import {catchError, map} from "rxjs/operators";
import {ResolvedData} from "../_models/resolved-data";
import {ProfileDetailsDto} from "../_models/profile-details-dto";
import {ProfileService} from "../_services/profile.service";
import {ROUTES} from "../routes";

@Injectable()
export class ProfileResolver implements Resolve<ResolvedData<ProfileDetailsDto>> {
  constructor(private profileService: ProfileService,
              private router: Router/*, private alertify: AlertifyService*/) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedData<ProfileDetailsDto>>{
    // catch any errors, if we have problems, we redirect and print a message for the user
    return this.profileService.getMainProfile().pipe(
      map((route) => new ResolvedData<ProfileDetailsDto>(route)),
      catchError(error => {
        this.router.navigate([ROUTES.HOME.url]);
        return of(new ResolvedData<ProfileDetailsDto>(null, error));
        // this.alertify.error('Problem retrieving data');
      })
    );
  }

}
