import {ValidationResult} from 'blow-validate';
import {Observable} from 'rxjs';

export function ifValid<T>(onValid: Observable<T>, onInvalid?: Observable<ValidationResult>) {
  return (validationResult): Observable<T | ValidationResult> => {
    if (validationResult.isValid) {
      return onValid;
    } else {
      return onInvalid || validationResult.asObservable();
    }
  }
}

export function isTrue(value: any): boolean {
  return !!value;
}