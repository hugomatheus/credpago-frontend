import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public title = 'Login';
  public loginForm: FormGroup;


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20)
      ])
    });
   }

  ngOnInit(): void {
  }

  onLoginSubmit(form: FormGroup) {
    this.authService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => this.toastr.warning('E-mail/Senha incorreto.', 'AVISO:'),
        complete: () => {
          this.toastr.success('Login realizado com sucesso.', 'SUCESSO:');
          this.router.navigate(['urls/list']);
        }
      }
    );
  }

}
