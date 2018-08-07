import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { TimeLineService } from '../common/timeline.service';

@Component({
    selector: 'app-main',
    styleUrls: [],
    templateUrl: 'main.html'
})
export class MainComponent extends CommonComponent implements OnInit {
    @ViewChild('mainpage') mainpage: ElementRef;
    constructor(public tlService: TimeLineService) {
        super();
    }

    ngOnInit() {
        this.tlService = this.tlService;
        this.tlService.mainpage = this.mainpage.nativeElement;
        this.addAction();
    }

}
