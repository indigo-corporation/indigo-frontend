import { Injectable } from "@angular/core";
import  * as alertyfy from 'alertifyjs';

@Injectable ({
    providedIn: "root"
})

export class AlertifyService {

    constructor() {
        alertyfy.set('notifier','position', "top-center");
    }

    success(message: string) {
        alertyfy.success(message);
    }

    warning(message: string) {
        alertyfy.warning(message);
    }

   error(message: string) {
    alertyfy.error(message);
    
   }

   setPosition(position:string) {
    alertyfy.set('notifier','position', position);
   }
    
}