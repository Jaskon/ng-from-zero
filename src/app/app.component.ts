import { Component } from '@angular/core';
import { trigger, transition, animate, style, query, group, animateChild } from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('mainRouterSwitch', [
      transition('* => *', [
        // (Its all ordered)
        // First run inner animations of leaved element
        // (If u want to do it in parallel with host elements animation, move it to the group below)
        query(':leave', animateChild(), {optional: true}),
        // Run enter/leave animation of host elements
        group([
          query(':enter', [
            style({
              left: '0%',
              opacity: '0'
            }),
            animate('.2s ease-out', style({
              left: '*',
              opacity: '*'
            }))
          ], {optional: true}),
          query(':leave', [
            animate('.2s ease-in', style({
              left: '100%',
              opacity: '0'
            }))
          ], {optional: true})
        ]),
        // Finally run inner animations of entered element
        query(':enter', animateChild(), {optional: true})
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ng-from-zero';

  routerSwitch$;

  constructor() { }


  getRouterState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData
      && outlet.activatedRouteData['state'];
  }
}
