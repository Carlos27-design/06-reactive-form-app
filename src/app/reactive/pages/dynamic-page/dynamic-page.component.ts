import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private formBuilder = inject(FormBuilder);
  public formUtils = FormUtils;

  myForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.formBuilder.array(
      [
        ['Metal Gears', [Validators.required]],
        ['Death Stranding', [Validators.required]],
      ],
      Validators.minLength(2)
    ),
  });

  public newFavorite = new FormControl('');

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  public onAddToFavorites() {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.formBuilder.control(newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  public onDeleteFavorite(index: number) {
    this.favoriteGames.removeAt(index);
  }

  public onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
