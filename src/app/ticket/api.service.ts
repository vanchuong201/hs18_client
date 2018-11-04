import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = env.baseUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  private url(endpoint: string): string {
    return this.baseUrl + endpoint;
  }

  login(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url('/login'), body).pipe(
      map(res => res.data),
      map(res => ({
        access_token: res.token,
        expires_in: res.ttl,
        user_id: res.user_id
      }))
    );
  }

  profile(): Observable<any> {
    let url = this.url('/find-user');
    return this.httpClient.get<any>(url).pipe(
      map(res => res.data),
      map(res => ({
        id: res.user_id || res._id,
        name: res.name
      }))
    );
  }

  speakers(options: { [key: string]: any } = {}) {
    let speakers = [];
    for (let i = 0; i < 100; i++) {
      speakers.push({
        id: i,
        name: 'Vu Duc Dung ' + i,
        description: 'asdfsdf',
        image: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'
      });
    }
    let start = options.page_size * (options.page - 1);
    let end = start + options.page_size;
    return of({
      items: speakers.slice(start, end),
      total: speakers.length
    });
  }

  getSpeakerByID(id: any) {
    let url = this.url(`/speakers/${id}`);
    return this.httpClient.get(url);
  }

  updateSpeaker(id: any, data: any) {
    let url = this.url(`/speakers/${id}`);
    return this.httpClient.put(url, data);
  }

  cities(options: { [key: string]: any } = {}): Observable<any> {
    let url = this.url('/cities');
    return this.httpClient.get<any>(url, { params: options }).pipe(map(res => {
      if (res.statusCode == 200) return res.data;
      return {
        cities: []
      };
    }));
  }

  districts(options: { [key: string]: any } = {}): Observable<any> {
    let url = this.url('/districts');
    return this.httpClient.get<any>(url, { params: options }).pipe(map(res => {
      if (res.statusCode == 200) return res.data;
      return {
        districts: []
      };
    }));
  }

  createEvent(data) {
    let url = this.url('/events/create');
    return this.httpClient.post(url, data)
  }

  events(options: { [key: string]: any } = {}) {
    let url = this.url('/events');
    return this.httpClient.get(url, { params: options });
  }

  changePassword(options: { [key: string]: any } = {}) {
    // let url = this.url('/change-password');
    // return this.httpClient.post(url, options);
    return of(true);
  }

  updateProfile(data: { [key: string]: any } = {}) {
    let url = this.url('/users/me');
    return this.httpClient.put(url, data);
  }


  filter_list(params): Observable<any> {
    let url = this.url('/search/list-filter');
    return this.httpClient.get<any>(url, { params: params }).pipe(
      map(res => {
        if (res.error) return [];
        return res.data.filters;
      }));
  }

  filter_create(data): Observable<any> {
    let url = this.url('/search/create-filter')
    return this.httpClient.post(url, data)
  }

  getAllCustomer(params): Observable<any> {
    let url = this.url('/customer');
    return this.httpClient.get<any>(url, { params: params }).pipe(
      map(res => {
        if (res.statusCode == 200) return res.data.customers;
        return {
          list: [],
          total: 0
        };
      }));
  }
  createCustomer(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url('/customer'), body).pipe(
      map(res => {
        if (res.statusCode == 200) return res.data;
        return false;
      })

    );
  }
  deleteCustomer(id): Observable<any> {
    return this.httpClient.delete<any>(this.url('/customer/' + id)).pipe(
      map(res => {
        if (res.statusCode == 200) return true;
        return false;
      })
    )
  }

  getAllTemplate(params): Observable<any> {
    let url = this.url('/template');
    return this.httpClient.get<any>(url, { params: params }).pipe(
      map(res => {
        if (res.statusCode == 200) return res.data;
        return {
          templates: [],
          total: 0
        };
      }));
  }
  createTemplate(body: any): Observable<any> {
    return this.httpClient.post<any>(this.url('/template'), body).pipe(
      map(res => {
        if (res.statusCode == 200) return true;
        return false;
      })

    );
  }
  updateTemplate(id: any, body: any): Observable<any> {
    return this.httpClient.put<any>(this.url('/template/' + id), body).pipe(
      map(res => {
        if (res.statusCode == 200) return true;
        return false;
      })

    );
  }
  deleteTemplate(id): Observable<any> {
    return this.httpClient.delete<any>(this.url('/template/' + id)).pipe(
      map(res => {
        if (res.statusCode == 200) return true;
        return false;
      })
    )
  }

}
