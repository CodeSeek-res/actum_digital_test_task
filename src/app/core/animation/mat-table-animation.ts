import { animate, sequence, state, style, transition, trigger } from '@angular/animations';

export const fadeOut = trigger('fadeOut', [
  state(
    'void',
    style({
      background: 'white',
      borderBottomColor: 'white',
      opacity: 0,
      transform: 'translateX(-550px)',
      'box-shadow': 'none',
    })
  ),
  transition('void => *', sequence([animate('.8s ease')])),
]);
