import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public menuItems = [
    { url: './list', title: 'List Supers', icon: 'label' },
    { url: './new-hero', title: 'Add Super', icon: 'add' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
