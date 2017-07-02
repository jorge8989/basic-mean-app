import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: String;
  name: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      name: this.name,
      email: this.email,
      password: this.password,
    };
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('fill the goddman fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('uhm.. that is not an email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('user regitered', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}
