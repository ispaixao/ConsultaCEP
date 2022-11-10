import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Endereco } from './model/Endereco';
import { ConsultaCEPService } from './services/consulta-cep.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ConsultaCEP';
  formCEP!: FormGroup;
  endereco!: Endereco;
  fontsize = 16;

  constructor(
    private consultaCEP: ConsultaCEPService,
    private formBuilder: FormBuilder
  ) {
    this.formCEP = this.formBuilder.group({
      cep: [''],
      logradouro: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
    });
  }

  getEndereco(): void {
    const cep: string = this.formCEP.get('cep')?.value;
    console.log(cep);

    this.consultaCEP.enderecoPorCep(cep).subscribe((endereco) => {
      this.endereco = endereco;

      this.formCEP.setValue({
        cep: endereco.cep ?? undefined,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        uf: endereco.uf,
      });
    });
  }

  fontIncrease(): void {
    // font increment
    this.fontsize++;

    let html: HTMLElement = <HTMLElement>(
      document.getElementsByTagName('html')[0]
    );
    if (html != null) {
      html.style.fontSize = `${this.fontsize}px`;
      console.log(html.style.fontSize);
    }
  }

  fontDecrease(): void {
    this.fontsize--;

    let html: HTMLElement = <HTMLElement>(
      document.getElementsByTagName('html')[0]
    );
    if (html != null) {
      html.style.fontSize = `${this.fontsize}px`;
      console.log(html.style.fontSize);
    }
  }
}
