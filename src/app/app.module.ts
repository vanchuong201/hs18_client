import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {SafeHtmlPipe} from './pipe/SafeHtmlPipe';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, vi_VN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import vi from '@angular/common/locales/vi';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoginComponent} from './pages/login/login.component';
import {MainComponent} from './pages/main/main.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HeaderComponent} from './components/header/header.component';
import {SiderComponent} from './components/sider/sider.component';
import {httpInterceptorProviders} from './utils/interceptors';
import {ChangepasswordComponent} from './pages/changepassword/changepassword.component';
import {ItemLayoutComponent} from './components/item-layout/item-layout.component';
import {EditorModule} from '@tinymce/tinymce-angular';

registerLocaleData(vi);

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        NotFoundComponent,
        HeaderComponent,
        SiderComponent,
        SafeHtmlPipe,
        ChangepasswordComponent,
        ItemLayoutComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        EditorModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
        httpInterceptorProviders,
        { provide: NZ_I18N, useValue: vi_VN }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
