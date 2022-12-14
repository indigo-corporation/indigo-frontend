import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SwiperModule } from 'swiper/angular';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms"
import { MatMenuModule } from '@angular/material/menu';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe } from './filter.pipe';
import { SafePipe } from './safe.pipe';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { api2Service } from './services/api2.service';
import { NgSelect2Module } from 'ng-select2';
import { MatButtonModule } from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularTelegramLoginWidgetModule } from 'angular-telegram-login-widget';
import { OAuthModule } from 'angular-oauth2-oidc';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { NgxStarRatingModule } from 'ngx-star-rating';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { SwiperComponent } from './swiper/swiper.component';
import { CardMainComponent } from './card-main/card-main.component';
import { MainComponent } from './main/main.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardSwiperComponent } from './card-swiper/card-swiper.component';
import { CardDiscriptionComponent } from './card-discription/card-discription.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './auth-popup/login/login.component';
import { PlayerComponent } from './player/player.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AuthPopup } from "./auth-popup/auth-popup.component";
import { RegisterComponent } from "./auth-popup/register/register.component"
import { AlertifyService } from './services/alertify.service';
import { HttpErrorInterceptorService } from './httperror.interceptor.service';
import { AuthInterceptorService } from './authInterceptor.service'
import { UserSettingComponent } from './user-page/user-setting/user-setting.component';
import { AuthGuard } from './shared/auth.guard';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchPageComponent } from './search-page/search-page.component';
import { CommentformComponent } from './comments/commentform/commentform.component';
import { CommentComponent } from './comments/comment/comment.component';
import { SubcommentComponent } from './comments/subcomment/subcomment.component';
import { LayoutComponent } from './layout/layout.component';
import { GenreMenuComponent } from './header/genre-menu/genre-menu.component';
import { GenreComponent } from './genre/genre.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { MessangerComponent } from './messanger/messanger.component';
import { MessageContactsComponent } from './messanger/message-contacts/message-contacts.component';
import { MessageChatComponent } from './messanger/message-chat/message-chat.component';
import { MoreFilmsComponent } from './more-films/more-films.component';
import { RememberPassComponent } from './remember-pass/remember-pass.component';
import { FavoriteComponent } from './user-page/favorite/favorite.component';
import { FavoritePageComponent } from './user-page/favorite/favorite-page/favorite-page.component';
import { WatchTogetherComponent } from './watch-together/watch-together.component';
import { WatchSettingsComponent } from './watch-together/watch-settings/watch-settings.component';
import { MessageHistoryComponent } from './messanger/message-history/message-history.component';
import { CardComponent } from './card/card.component';
import { ModalAddContactComponent } from './messanger/message-contacts/modal-add-contact/modal-add-contact.component';
import { BlockContactsComponent } from './messanger/message-contacts/block-contacts/block-contacts.component';
import { IncomeRequestsComponent } from './messanger/message-contacts/income-requests/income-requests.component';
import { OutcomeRequestsComponent } from './messanger/message-contacts/outcome-requests/outcome-requests.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { AutoFocusDirectiveDirective } from './auto-focus-directive.directive';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'search-page', component: SearchPageComponent },
  { path: 'support', component: SupportPageComponent },
  { path: 'message/:id', component: MessangerComponent, },
  { path: 'copyright', component: CopyrightComponent, },
  { path: 'friends', component: MessangerComponent },
  { path: 'message', component: MessangerComponent },
  { path: 'card-profile/:id/watch-together', component: CardContentComponent },
  { path: 'favorite', component: FavoritePageComponent },
  { path: 'remember-pass', component: RememberPassComponent },
  { path: ':type/genre/:id', component: GenreComponent },
  { path: 'film', component: CardsComponent },
  { path: 'anime', component: CardsComponent },
  { path: 'serial', component: CardsComponent },
  { path: 'cartoon', component: CardsComponent },
  { path: 'card-profile/:id', component: CardContentComponent },
  { path: 'dialog', component: AuthPopup },
  { path: 'reg', component: RegisterComponent },
  { path: 'user-page/:id', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'user-page', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'user-settings', component: UserSettingComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotfoundComponent },
  { path: '**', component: NotfoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SwiperComponent,
    CardMainComponent,
    FooterComponent,
    CardsComponent,
    MainComponent,
    CardContentComponent,
    CardSwiperComponent,
    CardDiscriptionComponent,
    CommentsComponent,
    LoginComponent,
    PlayerComponent,
    UserPageComponent,
    AuthPopup,
    RegisterComponent,
    UserSettingComponent,
    SearchComponent,
    SearchPageComponent,
    FilterPipe,
    SafePipe,
    CommentformComponent,
    CommentComponent,
    SubcommentComponent,
    LayoutComponent,
    GenreMenuComponent,
    GenreComponent,
    NotfoundComponent,
    MessangerComponent,
    MessageContactsComponent,
    MessageChatComponent,
    MoreFilmsComponent,
    RememberPassComponent,
    FavoriteComponent,
    FavoritePageComponent,
    WatchTogetherComponent,
    WatchSettingsComponent,
    MessageHistoryComponent,
    CardComponent,
    ModalAddContactComponent,
    BlockContactsComponent,
    IncomeRequestsComponent,
    OutcomeRequestsComponent,
    InfiniteScrollComponent,
    CopyrightComponent,
    AllNotificationsComponent,
    SupportPageComponent,
    AutoFocusDirectiveDirective 
  ],
  imports: [
    BrowserModule,
    OAuthModule.forRoot(),
    AppRoutingModule,
    NgxStarRatingModule,
    MatMenuModule,
    SwiperModule,
    MdbModalModule,
    SocialLoginModule,
    NgxPaginationModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
    PickerModule,
    NgSelect2Module,
    MatButtonModule,
    NgSelectModule,
    MatDatepickerModule,
    AngularTelegramLoginWidgetModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '714600049028-bmpane3m52o3ps8mtq4hp29aishso9uq.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    MatDatepickerModule,
    MatNativeDateModule,
    api2Service,
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AlertifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
