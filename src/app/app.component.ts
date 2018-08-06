import { Component } from '@angular/core';
import { AppService } from './app.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    constructor(public appServ: AppService) {
        this.appServ.getImageFromServer().subscribe(res => {
            console.log(res);
        });
    }
}
