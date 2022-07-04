import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, timer } from 'rxjs';
import { ArticlePreview } from 'src/app/core/models/article/article.preview.model';
import { ArticlesService } from 'src/app/core/data-access/articles.service';
import { setSearchText } from 'src/app/state/search-sidenav/search-sidenav.actions';

@Component({
  selector: 'app-editorial-articles',
  templateUrl: './editorial-articles.component.html',
  styleUrls: ['./editorial-articles.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EditorialArticlesComponent implements OnInit {
  constructor(
    private elRef: ElementRef,
    private articlesService: ArticlesService,
    private store: Store
  ) {}

  editorials$: Observable<ArticlePreview[]> =
    this.articlesService.getArticlesByCategory('opiniieditorial');

  ngOnInit(): void {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            (<HTMLElement[]>Array.from(entry.target.children)).forEach(
              (editorial: HTMLElement) => {
                editorial.classList.add('show');
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(this.elRef.nativeElement);
  }

  onOpenSearchSideNav() {
    this.store.dispatch(setSearchText({ text : '#opiniieditorial' }));
  }
}
