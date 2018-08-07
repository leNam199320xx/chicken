import { Component } from '@angular/core';
import { AppService } from './app.service';
import { LoaderService } from './common/loader.service';
import { FileType, FileModel } from './common/file.model';
import { PageName } from './common/game.model';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    title = 'app';
    commonBackgroundImage: FileModel;
    constructor(public appServ: AppService, public loadServ: LoaderService) {
        this.appServ.getImageFromServer().subscribe(res => {
            this.setFiles(res);
        }, error => {
            console.log('default config ', (<any>window).configs);
            this.setFiles((<any>window).configs);
        });
    }
    setFiles(_files: FileModel[]) {
        const filesImage: FileModel[] = [];
        const filesAudio: FileModel[] = [];
        _files.forEach(element => {
            if (element.filetype === FileType.image) {
                filesImage.push(element);
            } else if (element.filetype === FileType.audio) {
                filesAudio.push(element);
            }
        });
        this.loadServ.filesSub.subscribe(res => {
            console.log('common', res);
            this.loadServ.images.forEach(item => {
                if (item.page === PageName.common && item.type === 'background') {
                    this.commonBackgroundImage = item;
                    console.log('common', item);
                }
            });
        });
        this.loadServ.imagesObj = filesImage;
        this.loadServ.audiosObj = filesAudio;
        this.loadServ.load();
    }
}
