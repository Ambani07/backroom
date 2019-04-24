import { Rental } from '../../rental/shared/rental.model';

export class Contact{
    static readonly DATE_FORMAT = 'Y/MM/DD';
    _id : string;
    name: string;
    email: string;
    createdAt: string;
    rental: Rental;
}