import { Component, OnInit } from '@angular/core';
import { SupesService } from '../../services/supes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../models/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  public supe?: Hero;

  constructor(
    private supesService: SupesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSupe();
  }

  getSupe(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.supesService.getSupeById(id))
      ).subscribe( supe => {
        if(!supe) return this.router.navigate(['supers/list']);
        else {
          this.supe = supe;
          return supe;
        }
      });
  }

}
