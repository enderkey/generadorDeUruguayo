import { Component } from '@angular/core';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private apiService: ApiService){
    this.getRandom();
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

    this.showToast = true;
    
    setTimeout(()=>{
      this.showToast = false;
    }, 5000);

  }


  getName(){
    this.apiService.getName('firstname').subscribe(
      (data)=>{
        this.person.name = `${data[0]} ${data[1]}`;
      },
      (err)=>{
        console.error("error getting first names");
        console.error(err);
      }
    );
    this.apiService.getName('surname').subscribe(
      (data)=>{
        this.person.lastname = `${data[0]} ${data[1]}`;
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
      total++;
      checkDigit++;
    }

    return `${this.numberWithCommas(parseInt(ci))}-${checkDigit}`;
  }

  showToast = false;

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

  person = {
    name : 'John',
    lastname : 'Smith',
    city : "",
    birthdate : "",
    expeditionDate : "",
    dueDate : "",
    ci : "",
    photo : ""
  };

  getRandom() {
    this.person.city = this.cities[Math.floor(Math.random() * this.cities.length)];
    this.person.birthdate = this.resolveDate(null);
    this.person.expeditionDate = this.resolveDate(new Date(parseInt(this.person.birthdate.split('/')[2]), parseInt(this.person.birthdate.split('/')[1]), parseInt(this.person.birthdate.split('/')[2])));
    this.person.dueDate = `${this.person.expeditionDate.split('/')[0]}/${this.person.expeditionDate.split('/')[1]}/${parseInt(this.person.expeditionDate.split('/')[2])+10}`;
    this.person.ci = this.resolveCi();
    this.person.photo = "https://100k-faces.glitch.me/random-image?"+(new Date()).getTime();
    this.getName();
  }
  
}



