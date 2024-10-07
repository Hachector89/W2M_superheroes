import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SupesService } from '../../services/supes.service';
import { Hero } from '../../models/hero.model';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit {

  public supeForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  public saved = false;

  constructor(
    private supesService: SupesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getSupe();
  }

  getSupe(): void {
    if( !this.router.url.includes('edit') ) return;

    this.activatedRoute.params
      .pipe(
        switchMap ( ({id}) => this.supesService.getSupeById(id) ),
      ).subscribe ( supe => {
        if(!supe) return this.router.navigateByUrl('/');

        this.supeForm.reset(supe);
        return;
      })
  }

  get currentSupe(): Hero {
    const supe = this.supeForm.value as Hero;
    return supe;
  }

  onImageInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const imageUrl = inputElement.value;

    this.supeForm.get('image')?.setValue(imageUrl);
  }

  confirmDelete(): void {
    if( !this.currentSupe.id) throw Error('Supe ID is required');

    const dialogRef = this.dialog.open(DialogComponent, {
      data: this.supeForm.value,
    });

    dialogRef.afterClosed().subscribe(result => {
      if( !result ) return;

      this.supesService.deleteSupeById( this.currentSupe.id)
        .subscribe( res => {
          if(res) this.router.navigateByUrl('/');
        });

    });
  }

  onSubmit(): void {

    if( this.supeForm.invalid ) {
      this.saved = false;
      return;
    }

    if( this.currentSupe.id ){
      this.supesService.updateSupe( this.currentSupe )
        .subscribe( supe => {
          this.saved = true;
      });
      return;
    }

    this.supesService.newSupe( this.currentSupe )
      .subscribe( supe => {
        this.saved = true;
    });

  }

}
