import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes,
} from '@angular/animations';

export const slider = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isRight => *', slideTo('left')),
  transition('isLeft => *', slideTo('right')),
]);

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 50,
          [direction]: 0,
          width: '100%',
          opacity: 0,
        }),
      ],
      optional
    ),
    query(':enter', [style({ opacity: 1, [direction]: '-100%' })]),
    group([
      query(
        ':leave',
        [animate('600ms ease', style({ opacity: 0, [direction]: '100%' }))],
        optional
      ),
      query(':enter', [
        animate('600ms ease', style({ opacity: 1, [direction]: '0%' })),
      ]),
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}
