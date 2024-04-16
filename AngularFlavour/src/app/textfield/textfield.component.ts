import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.css'
})
export class TextfieldComponent {
  inputText: string = '';
  @Input() placeholder='';

  constructor(private dataService: DataService) { }

  updateTextValue(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.dataService.changeText(target.value);
    } else {
      console.error('Errore: L\'elemento target è null');
    }
  }


}
