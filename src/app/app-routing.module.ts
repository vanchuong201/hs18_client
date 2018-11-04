import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {AuthGuard} from './auth/auth.guard';
import {ChangepasswordComponent} from './pages/changepassword/changepassword.component';
import {GuestGuard} from './auth/guest.guard';

const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
    {
        path: '',
        component: MainComponent,
        canActivate: [AuthGuard],
        children: [
            {path: 'change-password', component: ChangepasswordComponent},
        ]
    },
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
