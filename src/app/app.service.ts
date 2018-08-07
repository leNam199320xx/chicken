import { Injectable } from '@angular/core';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { FileModel } from './common/file.model';
@Injectable()
export class AppService {
    pageIndex = 0;
    pageLength = 4;
    listPages = ['start', 'main', 'result', 'history'];
    images: HTMLImageElement[] = [];
    constructor(private http: HttpClient) {
    }
    next() {
        this.pageIndex += (this.pageIndex < this.pageLength - 1 && this.pageIndex >= 0) ? 1 : 0;
    }

    back() {
        this.pageIndex -= (this.pageIndex > 0 && this.pageIndex < this.pageLength - 1) ? 1 : 0;
    }

    getPageName() {
        return this.listPages[this.pageIndex];
    }

    getImageFromServer() {
        return this.http.get<FileModel[]>('assets/configs/images.json');
    }
}
