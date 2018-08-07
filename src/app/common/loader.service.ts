import { Injectable } from '@angular/core';
import { FileModel, FileType } from './file.model';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {
    images: FileModel[] = [];
    audios: FileModel[] = [];
    set imagesObj(files: FileModel[]) {
        const _t = new FileSubModel();
        _t.type = FileType.image;
        _t.files = files;
        this.images = files;
        this.filesSub.next(_t);
    }
    filesSub: Subject<FileSubModel> = new Subject();
    set audiosObj(files: FileModel[]) {
        const _t = new FileSubModel();
        _t.type = FileType.audio;
        _t.files = files;
        this.audios = files;
        this.filesSub.next(_t);
    }
    jsons: string[] = [];
    loadingIndex = 0;
    duration = 0;
    loaderElement: HTMLDivElement;
    isDone = false;
    load() {
        this.loadingIndex = 0;
        this.duration = this.images.length + this.audios.length;
        this.loaderElement = document.createElement('div');
        this.loaderElement.className = 'loading';
        document.body.appendChild(this.loaderElement);
        for (let i = 0; i < this.images.length; i++) {
            const img = document.createElement('img');
            img.src = this.images[i].url;
            this.images[i].element = img;
        }

        for (let i = 0; i < this.audios.length; i++) {
            const aud = document.createElement('audio');
            aud.autoplay = false;
            aud.src = this.audios[i].url;
            this.images[i].element = aud;
        }
        this.loadOne();
    }

    loadOne() {
        const ele = this.images[this.loadingIndex].element || this.audios[this.loadingIndex].element;

        ele.onload = ($event) => {
            if (this.loadingIndex < this.duration - 1) {
                this.loadingIndex++;
                this.loadOne();
            } else {
                this.isDone = true;
            }
            ele.parentElement.removeChild(ele);
        };

        ele.onerror = ele.onload;
        this.loaderElement.appendChild(ele);
    }
}

export class FileSubModel {
    files: FileModel[];
    type: FileType;
}
