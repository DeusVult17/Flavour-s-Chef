import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-test',
//   standalone:true,
//   imports:[TestComponent],
//   templateUrl: './tets.component.html',
//   styleUrl: './test.component.css'
// })
// export class TestComponent{

// }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TestComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AngularFlavour';
}
