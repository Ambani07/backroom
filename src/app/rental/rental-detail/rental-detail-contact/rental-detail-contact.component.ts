import { Component, OnInit, Input } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Contact } from '../../../contact/shared/contact.model';

import { HelperService } from '../../../common/service/helper.service';
import { ContactService } from '../../../contact/shared/contact.service';
import { AuthService } from '../../../auth/shared/auth.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'br-rental-detail-contact',
  templateUrl: './rental-detail-contact.component.html',
  styleUrls: ['./rental-detail-contact.component.scss']
})
export class RentalDetailContactComponent implements OnInit {
  @Input() rental : Rental;
  newContact : Contact;
  errors : any[] = [];

  constructor(private helper: HelperService,
              private modalService : NgbModal,
              private contactService: ContactService,
              private toastr: ToastrManager,
              public auth: AuthService) { }

  ngOnInit() {
    this.newContact = new Contact();
    
  }

  createContact(){
    this.newContact.rental = this.rental;
    this.newContact.name = this.auth.getUserName();
    this.newContact.email = this.auth.getUserEmail();

    this.contactService.createContact(this.newContact).subscribe(
      () => {
        this.newContact = new Contact();
        this.toastr.successToastr('Contact me sent, check your request(s) in manage section', 'Success!');
      },

      (errResponse: HttpErrorResponse) => {
        this.errors = errResponse.error.errors;
      }
    );
  }

}
