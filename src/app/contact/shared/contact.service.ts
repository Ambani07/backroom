import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact.model';


@Injectable()
export class ContactService {

  constructor(private http: HttpClient){}
  
  public createContact(contact: Contact): Observable<any> {
    return this.http.post('api/v1/contacts', contact);
  }

}