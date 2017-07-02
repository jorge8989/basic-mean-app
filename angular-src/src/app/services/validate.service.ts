import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  validateRegister(user) {
    return !(user.username == undefined || user.name == undefined ||
      user.email == undefined || user.password == undefined);
  }

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
}
