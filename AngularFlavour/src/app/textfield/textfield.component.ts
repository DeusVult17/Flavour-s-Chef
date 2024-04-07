import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrl: './textfield.component.css'
})
export class TextfieldComponent {
  inputText: string = '';
  @Input() placeholder='';
}
