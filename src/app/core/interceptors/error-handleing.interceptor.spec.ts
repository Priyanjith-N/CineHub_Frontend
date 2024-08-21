import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { errorHandleingInterceptor } from './error-handleing.interceptor';

describe('errorHandleingInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => errorHandleingInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
