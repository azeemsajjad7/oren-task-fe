import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class GeneralService {
  constructor(private http: HttpClient) {}

  callApi(
    method: string,
    url: string,
    data: any = null,
    options: any = {}
  ): Observable<any> {
    if (method.toLowerCase() == 'get') {
      return this.http.get<any>(environment.api_prefix + url, options);
    } else {
      // @ts-ignore: Unreachable code error
      return this.http[method]<any>(
        environment.api_prefix + url,
        data,
        options
      );
    }
  }
}
