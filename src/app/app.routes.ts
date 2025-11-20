import { Routes } from '@angular/router';
import { List } from './pages/front/list/list';
import { Detail } from './pages/front/detail/detail';
import { About } from './pages/front/about/about';
import { Login } from './pages/admin/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { Add } from './pages/admin/add/add';
import { Edit } from './pages/admin/edit/edit';
import { authGuard } from './guards/auth-guard';
import { Mdp } from './pages/admin/mdp/mdp';

export const routes: Routes = [
    //front
    { path: '', redirectTo: 'front/list', pathMatch: 'full' },
    { path: 'front/list', component: List },
    { path: 'front/detail/:id', component: Detail },
    { path: 'front/about', component: About },
    //admin
    {
        path: 'admin',
        children: [
            { path: 'login', component: Login },
            {path: 'dashboard', component: Dashboard, canActivate:[authGuard]},
            { path: 'mdp', component: Mdp,canActivate:[authGuard] },
            { path: 'add', component: Add,canActivate:[authGuard] },
            { path: 'edit/:id', component: Edit,canActivate:[authGuard] },
        ]
    },
    //error
    { path: '**', redirectTo: 'front/list' }
];
