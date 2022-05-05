import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/shared/services/auth/auth.service';
import { UserDTO } from './UserDTO';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public title = 'Cadastro';
  public registerForm: FormGroup;
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
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

  onRegisterSubmit(form: FormGroup) {
    const data = this.registerForm.getRawValue() as UserDTO;
    this.authService.register(data).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => {
          Object.keys(e.error.errors).forEach((key) => {
            e.error.errors[key].forEach((message: any) => {
              this.toastr.error(message, 'ERRO')
            });
          });
        },
        complete: () => {
          this.toastr.success('Cadastro realizado com sucesso.', 'SUCESSO:');
          this.router.navigate(['login'])
        }
      }
    );
  }

}
