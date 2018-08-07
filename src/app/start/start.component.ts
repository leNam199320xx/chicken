import { Component, Input, OnInit } from '@angular/core';
import { CommonComponent } from '../common/common.component';
import { AppService } from '../app.service';
import { LoaderService } from '../common/loader.service';
import { FileModel, FileType } from '../common/file.model';
import { PageName } from '../common/game.model';

@Component({
    selector: 'app-start',
    styleUrls: [],
    templateUrl: 'start.html'
})
export class StartComponent extends CommonComponent implements OnInit {
    backgroundImage: FileModel;
    startImage: FileModel;
    startHoverImage: FileModel;
    constructor(public appServ: AppService, private loaderServ: LoaderService) {
        super();
    }
    ngOnInit() {
        this.loaderServ.filesSub.subscribe(res => {
            if (res.type === FileType.image) {
                this.loadImage();
            }
        });
        this.loadImage();
    }
    loadImage() {
        this.loaderServ.images.forEach(item => {
            if (item.page === PageName.start && item.type === 'background') {
                this.backgroundImage = item;
            }
            if (item.page === PageName.start && item.type === 'button') {
                this.startImage = item;
            }
        });
    }
    gotoMainPage() {
        this.appServ.next();
    }
}
