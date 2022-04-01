import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { deleteNullObject } from '../helpers/helpers';
import { IResponseModel } from '../models/response/response.model';
import { IResponsesModel } from '../models/response/responses.model';


@Injectable({
    providedIn: 'root'
})
export class BackService {

    private options =
        {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            })
        }


    private url: string;
    constructor(
        private _httpClient: HttpClient
    ) {}

    lists(complement: string, params?: string): Observable<IResponsesModel> {
        if (params) {
            this.url = environment.urlAPI + complement + '/' + params;
        } else {
            this.url = environment.urlAPI + complement;
        }
        return this._httpClient.get<IResponsesModel>(this.url, this.options);
    }

    getById(complement: string, id?: any): Observable<IResponseModel> {
        if(id){
            this.url = environment.urlAPI + complement + "/" + id;
        }
        else
        {
            this.url = environment.urlAPI + complement;
        }
        return this._httpClient.get<IResponseModel>(this.url, this.options);
    }

    save(complement: string, body: any): Observable<IResponseModel> {
        this.url = environment.urlAPI + complement;
        body = deleteNullObject(body);
        return this._httpClient.post<IResponseModel>(this.url, body, this.options);
    }

    update(complement: string, body: any, id: any): Observable<IResponseModel> {
        this.url = environment.urlAPI + complement + "/" + id;
        return this._httpClient.put<IResponseModel>(this.url, body);
    }

    delete(complement: string, id: any, body?:any): Observable<IResponseModel> {
        const url = environment.urlAPI + complement + "/" + id;
        body = deleteNullObject(body);
        return this._httpClient.delete<IResponseModel>(url,{ body:body });
    }

}
