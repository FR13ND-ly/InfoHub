import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { timer } from 'rxjs';
import { interval } from 'rxjs';
import { SearchSidenavOpenService } from 'src/app/shared/data-access/search-sidenav-open.service';
import { UpdateSearchTextService } from 'src/app/shared/data-access/update-search-text.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  constructor(private searchSidenavOpenService : SearchSidenavOpenService, private updateSearchTextService : UpdateSearchTextService) { }

  @ViewChildren('tagRef') tagsRef! : QueryList<ElementRef>

  @Input() tags! : Array<string>

  ngOnInit(): void {
    interval(6000).subscribe(() => {
      (<ElementRef[]>this.tagsRef.toArray()).forEach((tag: ElementRef) => {
        tag.nativeElement.classList.toggle('jump')
        timer(0).subscribe(() => tag.nativeElement.classList.toggle('jump'))
      })
    })
  }

  onSearchByTag(tag : string) {
    this.searchSidenavOpenService.changeOpenSearchNav(true)
    this.updateSearchTextService.setSearchText("#" + tag)
  }

}
