import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class messangerService {

    readonly url = "http://indigo-api.loc/api/"
    constructor(private http: HttpClient) {

    }
    delete(method, body = {}) {
        let url = this.url + method
        console.log(url, body);
        return this.http.delete<any>(url, body)
    }

    get(method, params = {}) {
        let url = this.url + method + "?"
        for (var key in params) {
            url += "&" + key + "=" + params[key]
        }
        console.log(this.http.get<any>(url));

        return this.http.get<any>(url)
    }

    post(method, body = {}) {
        let url = this.url + method
        console.log(url, body);
        return this.http.post<any>(url, body)
    }

    getChats(page=1): Observable<any> {
        return this.get("chats", {page:page})
    }

    getChat(id): Observable<any> {
        return this.get("chats/" + id)
    }

    deleteChat(id): Observable<any> {
        return this.delete("chats/" + id)
    }

    getChatByUser(user_id): Observable<any> {
        return this.get("chats/get-by-user", { user_id: user_id })
    }

    postMessage(chat_id, body): Observable<any> {
        return this.post("messages", {
            chat_id: chat_id, body: body
        })
    }

    deleteMessage(id): Observable<any> {
        return this.delete("messages/" + id)
    }

    addContact(user_id): Observable<any> {
        return this.post("contact-requests/create", {user_id: user_id})
    }
    removeContact(user_id): Observable<any> {
        return this.post("contacts/remove", {user_id:user_id})
    }

    getContactsArray(): Observable<any> {
        return this.get("contacts/all-ids")
    }

    getContacts(page=1): Observable<any> {
        return this.get("contacts/all", {page:page})
    }

    getSearchContacts(find): Observable<any> {
        return this.get("contacts/search", {find:find})
    }
    
    getUsersSearch(find): Observable<any> {
        return this.get("users/search", {find:find})
    }

    getOutComes(): Observable<any> {
        return this.get("contact-requests/outcomes")
    }

    getInComes(): Observable<any> {
        return this.get("contact-requests/incomes")
    }

    
    acceptRequest(id): Observable<any> {
        return this.post("contact-requests/"+id+"/accept")
    }

    destroyRequest(id): Observable<any> {
        return this.post("contact-requests/"+id+"/destroy")
    }

    getBannedUsers(): Observable<any> {
        return this.get("banned-users/all")
    }

    postBannedUseradd(user_id): Observable<any> {
        return this.post("banned-users/add", {user_id:user_id})
    }

    postBannedUserRemove(user_id): Observable<any> {
        return this.post("banned-users/remove", {user_id:user_id})
    }
}