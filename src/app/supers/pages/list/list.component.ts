import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero.model';
import { SupesService } from '../../services/supes.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public supes: Hero[] = [];
  public queryInput = new FormControl('');

  constructor(
    private supesService: SupesService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.supesService.getSupes().subscribe( supes => this.supes = supes );
  }

  searchHero(): void {
    const value: string = this.queryInput.value || '';

    if(value.length >= 3)
      this.supesService.getAutocomplete(value)
        .subscribe( supes => this.supes = supes)

    if(value.length === 0)
      this.getHeroes();
  }

}
