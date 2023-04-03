import { Injectable } from "@angular/core";
import * as alertify from "alertifyjs";
@Injectable ({
    providedIn: "root"
})

export class AlertifyService {

    constructor() {
        alertify.set('notifier','position', "top-center");
    }

    success(message: string) {
        alertify.success(message);
    }

    warning(message: string) {
        alertify.warning(message);
    }

   error(message: string) {
        alertify.error(message);
   }

   setPosition(position:string) {
        alertify.set('notifier','position', position);
   }
    
}