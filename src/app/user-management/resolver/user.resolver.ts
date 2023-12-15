import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { IUser } from '../model/user.model';
import { UserService } from '../services/user.service';

export const userResolver: ResolveFn<IUser> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(UserService).getUserById(route.paramMap.get('id')!);
};
