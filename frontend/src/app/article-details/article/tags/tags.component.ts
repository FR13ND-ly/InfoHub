import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { timer } from 'rxjs';
import { interval } from 'rxjs';
import { setSearchText } from 'src/app/state/search-sidenav/search-sidenav.actions';
@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit {
  
  constructor(private store: Store<any>) {}

  @ViewChildren('tagRef') tagsRef!: QueryList<ElementRef>;

  @Input() tags!: string[];

  ngOnInit(): void {
    interval(6000).subscribe(() => {
      (<ElementRef[]>this.tagsRef.toArray()).forEach((tag: ElementRef) => {
        tag.nativeElement.classList.toggle('jump');
        timer(0).subscribe(() => tag.nativeElement.classList.toggle('jump'));
      });
    });
  }

  onSearchByTag(tag: string) {
    this.store.dispatch(setSearchText({text : '#' + tag}));
  }
}
