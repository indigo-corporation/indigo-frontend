import { TestBed } from '@angular/core/testing';

import { HttpErrorInterceptorService } from './httperror.interceptor.service';

describe('HttperrorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpErrorInterceptorService
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpErrorInterceptorService = TestBed.inject(HttpErrorInterceptorService);
    expect(interceptor).toBeTruthy();
  });
});
