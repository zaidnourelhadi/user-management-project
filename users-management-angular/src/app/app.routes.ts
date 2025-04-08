import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { UserslistComponent } from './userslist/userslist.component';
import { usersGuard, adminGuard, noAuthGuard } from './users.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [noAuthGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'profile', 
    component: ProfileComponent, 
    canActivate: [usersGuard] 
  },
  { 
    path: 'update/:id', 
    component: UpdateuserComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'users', 
    component: UserslistComponent, 
    canActivate: [adminGuard] 
  },
  // Redirect all unknown paths based on auth state
  { 
    path: '**',
    canActivate: [noAuthGuard],
    children: [] // This will force the guard to handle the redirect
  },
  { 
    path: '', 
    redirectTo: 'profile', 
    pathMatch: 'full' 
  },
  
];