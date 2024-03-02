import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { INSUFFICIENT_AUTH } from './auth.service';

interface StepupHttpErrorResponse {
  error: string;
  error_description: string;
  acr_values: string;
  max_age?: string;
}

export interface StepupError {
  name: string;
  message: string;
}

const AUTH_HEADER = 'WWW-Authenticate';

const formatStepupErrorResponse = (httpError: HttpErrorResponse): StepupHttpErrorResponse => {
  const authResponse = httpError.headers.get(AUTH_HEADER) ?? '';
  const paramArr = (authResponse.replace('Bearer ', '').split(',') ?? []).map(el => el.replaceAll('"', '').split('='));
  return Object.fromEntries(paramArr);
}

const handleError = (httpError: HttpErrorResponse) => {
  const allowedOrigins = ['/api'];
  if (httpError.status !== HttpStatusCode.Unauthorized || !allowedOrigins.find(origin => httpError.url?.includes(origin))) {
    return throwError(() => httpError);
  }

  let returnError: HttpErrorResponse|StepupError = httpError;
  if (!httpError.headers.has(AUTH_HEADER)) {
    return throwError(() => returnError);
  }

  const stepUpError = formatStepupErrorResponse(httpError);
  if (stepUpError.error === INSUFFICIENT_AUTH) {
    returnError = {name: stepUpError.error, message: stepUpError.acr_values};
  }

  return throwError(() => returnError)
};

export const stepupInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(handleError)
  );
};


