import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxSpinnerModule } from "ngx-spinner";


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardsComponent } from './cards/cards.component';
import { SwiperComponent } from './swiper/swiper.component';
import { CardMainComponent } from './card-main/card-main.component';
import { MainComponent } from './main/main.component';
import { CardContentComponent } from './card-content/card-content.component';
import { CardDiscriptionComponent } from './card-discription/card-discription.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login and registration components/login/login.component';
import { PlayerComponent } from './player/player.component';
import { UserPageComponent } from './user-page/user-page.component';
import { RegisterComponent } from "./login and registration components/register/register.component"
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
import { MessageHistoryComponent } from './messanger/message-history/message-history.component';
import { ModalAddContactComponent } from './messanger/message-contacts/modal-add-contact/modal-add-contact.component';
import { BlockContactsComponent } from './messanger/message-contacts/block-contacts/block-contacts.component';
import { IncomeRequestsComponent } from './messanger/message-contacts/income-requests/income-requests.component';
import { OutcomeRequestsComponent } from './messanger/message-contacts/outcome-requests/outcome-requests.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { AllNotificationsComponent } from './all-notifications/all-notifications.component';
import { SupportPageComponent } from './support-page/support-page.component';
import { AutoFocusDirectiveDirective } from './auto-focus-directive.directive';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { CardComponent } from './card/card.component';
import { CardForSwipersComponent } from './card-for-swipers/card-for-swipers.component';
import { ImageCropperModule } from 'ngx-image-cropper';

const appRoutes: Routes = [
  { path: '', component: MainComponent },

  { path: 'sitemap.xml', redirectTo: 'assets/sitemap.xml' },
  { path: 'support', component: SupportPageComponent },
  { path: 'user-page/:id', component: UserPageComponent, canActivate: [AuthGuard] },
  /* { path: 'message/:id', component: MessangerComponent, canActivate: [AuthGuard]  }, */
  { path: 'copyright', component: CopyrightComponent, },
  /*  { path: 'friends', component: MessangerComponent, canActivate: [AuthGuard]  },
   { path: 'message', component: MessangerComponent, canActivate: [AuthGuard]  }, */
  /*   { path: 'card-profile/:id/watch-together', component: CardContentComponent }, */
  { path: 'favorite', component: FavoritePageComponent, canActivate: [AuthGuard] },
  { path: 'remember-pass', component: RememberPassComponent },
  { path: ':type/genre/:id', component: GenreComponent },
  { path: 'film', component: CardsComponent },
  { path: 'anime', component: CardsComponent },
  { path: 'serial', component: CardsComponent },
  { path: 'cartoon', component: CardsComponent },
  { path: 'search-page', component: SearchPageComponent },
  { path: ':category/:id', component: CardContentComponent },
  { path: 'reg', component: RegisterComponent, canActivate: [AuthGuard] },
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
    CardDiscriptionComponent,
    CommentsComponent,
    LoginComponent,
    PlayerComponent,
    UserPageComponent,
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
    MessageHistoryComponent,
    ModalAddContactComponent,
    BlockContactsComponent,
    IncomeRequestsComponent,
    OutcomeRequestsComponent,
    InfiniteScrollComponent,
    CopyrightComponent,
    AllNotificationsComponent,
    SupportPageComponent,
    AutoFocusDirectiveDirective,
    ModalLoginComponent,
    CardComponent,
    CardForSwipersComponent,

  ],
  imports: [
    BrowserModule,
    NgxSkeletonLoaderModule.forRoot(),
    LazyLoadImageModule,
    ImageCropperModule,
    OAuthModule.forRoot(),
    AppRoutingModule,
    NgxStarRatingModule,
    MatMenuModule,
    SwiperModule,
    MdbModalModule,
    SocialLoginModule,
    MatProgressSpinnerModule,
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
    MatButtonModule,
    MatDatepickerModule,
    AngularTelegramLoginWidgetModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate' }),
    InfiniteScrollModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '109461696080-uv6ur5krrd2vg23d8uask9v58cp3ct7g.apps.googleusercontent.com'
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
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
