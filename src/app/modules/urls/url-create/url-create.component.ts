import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UrlService } from '../url.service';

export interface UrlDTO {
  description: string;
}

@Component({
  selector: 'app-url-create',
  templateUrl: './url-create.component.html',
  styleUrls: ['./url-create.component.scss']
})
export class UrlCreateComponent implements OnInit {
  public form: FormGroup;
  public reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(private urlService: UrlService, private router: Router, private toastr: ToastrService) {
    this.form = new FormGroup({
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(this.reg)
      ])
    });
   }

  ngOnInit(): void {
  }

  create(){
    const data = this.form.getRawValue() as UrlDTO;
    this.urlService.create(data).subscribe(
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
          this.router.navigate(['urls/list'])
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/urls/list']);
  }

}
