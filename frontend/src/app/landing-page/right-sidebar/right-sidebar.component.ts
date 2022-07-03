import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Widget } from 'src/app/core/models/widget.model';
import { WidgetsService } from 'src/app/widgets/data-access/widgets.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {

  constructor(private widgetsService : WidgetsService) { }

  widget$ : Observable<Widget> = this.widgetsService.getWidget(2)
  weeklyImg$ : Observable<Widget> = this.widgetsService.getWidget(3).pipe(
    map((widget : Widget) =>  {
      return {...widget, revealed : false }
    })
  )
}