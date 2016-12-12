import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { EnhancedComponent } from 'ng2-enhanced-component-decorator';

import { LayoutType, EnhancedComponentConfig } from './layout-type.enum';
import { LayoutManagerService } from './layout-manager.service';

@EnhancedComponent<EnhancedComponentConfig>({
  layout: LayoutType.RED_BACKGROUND,
})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public layoutClassName: string;
  private subscription: Subscription;

  constructor(private layoutManagerService: LayoutManagerService) {}

  ngOnInit() {
    this.subscription = this.layoutManagerService.layoutClassName$
      .subscribe(layoutClass => this.layoutClassName = layoutClass);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
