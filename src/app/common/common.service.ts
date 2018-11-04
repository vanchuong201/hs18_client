import { Injectable } from '@angular/core';
import { ApiService } from '../ticket/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(
        private api: ApiService
    ) { }

}
