import { Component } from '@angular/core';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private apiService: ApiService){
    this.getName();
  }


  numberWithCommas = (x:number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  
  resolveDate = (fromDate: any) => {
    let myDate = this.randomDate(fromDate ? fromDate : new Date(1950, 0, 1), new Date());

    return `${myDate.getDay()}/${myDate.getMonth()+1}/${myDate.getFullYear()}`;
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  getName(){
    this.apiService.getName('firstname').subscribe(
      (data)=>{
        this.name += `${data[0]} ${data[1]}`;
      },
      (err)=>{
        console.error("error getting first names");
        console.error(err);
      }
    );
    this.apiService.getName('surname').subscribe(
      (data)=>{
        this.lastname += `${data[0]} ${data[1]}`;
      },
      (err)=>{
        console.error("error getting last names");
        console.error(err);
      }
    );
  }


  resolveCi() {
    var ci = '';
    var magicNumber = [2, 9, 8, 7, 6, 3, 4];

    var total = 0;

    var checkDigit = 0;

    magicNumber.forEach(mg=>{

      let ciDigit = Math.floor(Math.random() * 9) + 1;

      ci += `${ciDigit}`;
      total += ciDigit*mg;

    });

    while (`${total}`.charAt(`${total}`.length-1) != '0') {
      console.log(total);
      total++;
      checkDigit++;
    }

    return `${this.numberWithCommas(parseInt(ci))}-${checkDigit}`;
  }

  

  title = 'Uruguayan generator';

  cities = [
    "Artigas",
    "Canelones",
    "Cerro Largo",
    "Colonia",
    "Durazno",
    "Flores",
    "Florida",
    "Lavalleja",
    "Maldonado",
    "Montevideo",
    "Paysandú",
    "Río Negro",
    "Rivera",
    "Rocha",
    "Salto",
    "San José",
    "Soriano",
    "Tacuarembó",
    "Treinta y Tres"
  ];

  city = this.cities[Math.floor(Math.random() * this.cities.length)];

  name = 'John';
  lastname = 'Smith';
  birthdate = this.resolveDate(null);
  expeditionDate = this.resolveDate(new Date(parseInt(this.birthdate.split('/')[2]), parseInt(this.birthdate.split('/')[1]), parseInt(this.birthdate.split('/')[2])));
  dueDate = `${this.expeditionDate.split('/')[0]}/${this.expeditionDate.split('/')[1]}/${parseInt(this.expeditionDate.split('/')[2])+10}`;
  ci = this.resolveCi();
  
}



