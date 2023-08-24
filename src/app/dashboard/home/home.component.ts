import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CounterActions } from 'src/app/store/counter.actions';
import { selectCounterState, selectCounterStateValue } from 'src/app/store/counter.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private store: Store) {
    this.store.subscribe({
      next: v => {
        console.log('STORE',v);
      }
    });

    this.store.select(selectCounterState).subscribe({
      next: v => {
        console.log('SELECT COUNTER STATE',v);
      }
    });

    this.store.select(selectCounterStateValue).subscribe({
      next: v => {
        console.log('SELECT COUNTER STATE VALUE',v);
        this.studentsQuantity = v;
      }
    });    
  }

  onIncrease(): void {
    this.store.dispatch(CounterActions.increase())
  };

  onDecrease(): void {
    this.store.dispatch(CounterActions.decrease())
  };

  public studentsQuantity = 0;

  public coursesQuantity = 0;
}
