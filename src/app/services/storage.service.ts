import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "app/config/storage_keys";
import { LocalUser } from "app/models/user.model";



@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj : LocalUser) {
        if (obj === null) {
            
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}