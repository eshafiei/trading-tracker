import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationService } from './auth/services/authorization.service';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducer';
import { SideMenuComponent } from './site/side-menu/side-menu.component';
import { NotFoundPage } from './site/not-found/not-found.page';
import { httpInterceptorProviders } from './shared/interceptors';
import { NavigationService } from './shared/services/navigation.service';

@NgModule({
  declarations: [AppComponent, SideMenuComponent, NotFoundPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    SharedModule, AuthModule, StoreModule.forRoot({authenticatedUser: authReducer})],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AuthorizationService, NavigationService,
     AuthGuardService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
