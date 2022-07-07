import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  @Input() tags : string[] = []; 

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  alltags: string[] = ['Divertisment', 'LongRead', 'Educație', 'Cultural', 'Ecologic', 'Economic', 'Interviu', 'Politic', 'Sănătate', 'Social', 'Sportiv', 'Finanțe', 'Incidente', 'Internațional', 'Investigații', 'Justiție', 'Meteo', 'OpiniiEditorial', 'Poliție', 'Religie', 'StopFals', 'SuccesComunitar', 'Transport', "IT"];

  @ViewChild('fruitInput') tagsInput: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.alltags.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags!.push(value);
    }
    event.chipInput!.clear();

    this.tagsCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.tags!.indexOf(fruit);

    if (index >= 0) {
      this.tags!.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags!.push(event.option.viewValue);
    this.tagsInput!.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
