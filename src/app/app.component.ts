import { Component } from '@angular/core';
import { AppService } from './app.service';
import { LoaderService } from './common/loader.service';
import { FileType, FileModel } from './common/file.model';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    constructor(public appServ: AppService, public loadServ: LoaderService) {
        this.appServ.getImageFromServer().subscribe(res => {
            const filesImage: FileModel[] = [];
            const filesAudio: FileModel[] = [];
            res.forEach(element => {
                if (element.filetype === FileType.image) {
                    filesImage.push(element);
                } else if (element.filetype === FileType.audio) {
                    filesAudio.push(element);
                }
            });
            this.loadServ.imagesObj = filesImage;
            this.loadServ.audiosObj = filesAudio;
            this.loadServ.load();
        });
    }
}
