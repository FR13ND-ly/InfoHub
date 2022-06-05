import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-more-articles',
  templateUrl: './more-articles.component.html',
  styleUrls: ['./more-articles.component.scss']
})
export class MoreArticlesComponent implements AfterViewInit {

  constructor() { }

  @ViewChild('articlesRef') articlesRef! : ElementRef

  articles = [
    {
      url : '43',
      imageUrl : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/faa48d2d-12c2-43d1-bf23-b5e99857825b/df0qcbg-31dfc7f5-dab9-4101-85fe-1b124f319219.jpg/v1/fill/w_622,h_350,q_70,strp/dream_in_colors_by_ellysiumn_df0qcbg-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZhYTQ4ZDJkLTEyYzItNDNkMS1iZjIzLWI1ZTk5ODU3ODI1YlwvZGYwcWNiZy0zMWRmYzdmNS1kYWI5LTQxMDEtODVmZS0xYjEyNGYzMTkyMTkuanBnIiwiaGVpZ2h0IjoiPD00NTAiLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cL2ZhYTQ4ZDJkLTEyYzItNDNkMS1iZjIzLWI1ZTk5ODU3ODI1YlwvZWxseXNpdW1uLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.09GrLTfKzPVtwVCPYdghIuqx7wFUjBnE7KCty5iljpY',
      title : "Lorem ipsum dolor sit amet."
    },
    {
      url : '235',
      imageUrl : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/faa48d2d-12c2-43d1-bf23-b5e99857825b/df0qcbg-31dfc7f5-dab9-4101-85fe-1b124f319219.jpg/v1/fill/w_622,h_350,q_70,strp/dream_in_colors_by_ellysiumn_df0qcbg-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZhYTQ4ZDJkLTEyYzItNDNkMS1iZjIzLWI1ZTk5ODU3ODI1YlwvZGYwcWNiZy0zMWRmYzdmNS1kYWI5LTQxMDEtODVmZS0xYjEyNGYzMTkyMTkuanBnIiwiaGVpZ2h0IjoiPD00NTAiLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cL2ZhYTQ4ZDJkLTEyYzItNDNkMS1iZjIzLWI1ZTk5ODU3ODI1YlwvZWxseXNpdW1uLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.09GrLTfKzPVtwVCPYdghIuqx7wFUjBnE7KCty5iljpY',
      title : "Lorem ipsum dolor sit amet."
    },
    {
      url : '32',
      imageUrl : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/faa48d2d-12c2-43d1-bf23-b5e99857825b/df0qcbg-31dfc7f5-dab9-4101-85fe-1b124f319219.jpg/v1/fill/w_622,h_350,q_70,strp/dream_in_colors_by_ellysiumn_df0qcbg-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ZhYTQ4ZDJkLTEyYzItNDNkMS1iZjIzLWI1ZTk5ODU3ODI1YlwvZGYwcWNiZy0zMWRmYzdmNS1kYWI5LTQxMDEtODVmZS0xYjEyNGYzMTkyMTkuanBnIiwiaGVpZ2h0IjoiPD00NTAiLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLndhdGVybWFyayJdLCJ3bWsiOnsicGF0aCI6Ilwvd21cL2ZhYTQ4ZDJkLTEyYzItNDNkMS1iZjIzLWI1ZTk5ODU3ODI1YlwvZWxseXNpdW1uLTQucG5nIiwib3BhY2l0eSI6OTUsInByb3BvcnRpb25zIjowLjQ1LCJncmF2aXR5IjoiY2VudGVyIn19.09GrLTfKzPVtwVCPYdghIuqx7wFUjBnE7KCty5iljpY',
      title : "Lorem ipsum dolor sit amet."
    }
  ]

  ngAfterViewInit(): void {
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((surveyEntry : IntersectionObserverEntry) => {
        if (surveyEntry.isIntersecting) {
          surveyEntry.target.classList.add('show')
          observer.unobserve(surveyEntry.target)
        }
      })
    }, {threshold : .5})
    observer.observe(this.articlesRef.nativeElement)
  }

}
