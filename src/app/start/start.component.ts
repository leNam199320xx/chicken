import { Component } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { AppService } from '../app.service';

@Component({
    selector: 'app-start',
    styleUrls: [],
    templateUrl: 'start.html'
})
export class StartComponent extends CommonComponent {

    gotoMainPage() {
        this.appServ.next();
    }
}
