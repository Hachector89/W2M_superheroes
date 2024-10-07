import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-supe-card',
  templateUrl: './supe-card.component.html',
  styleUrls: ['./supe-card.component.scss']
})
export class SupeCardComponent implements OnInit {

  @Input() public super!: Hero;

  constructor() { }

  ngOnInit(): void {
    this.validateSuper();
  }

  validateSuper(): void {
    if( !this.super ) throw Error('Super is required');
  }

}
