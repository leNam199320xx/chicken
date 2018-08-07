import { PageName } from './game.model';

export class FileModel {
    filetype: FileType;
    name: string;
    page: PageName;
    url: string;
    size: number[];
    type: GameType;
    element: HTMLImageElement | HTMLAudioElement;
}

export enum FileType {
    image = 'image',
    audio = 'audio'
}

export enum GameType {
    background = 'background',
    button = 'button',
    dynamic = 'dynamic',
    static = 'static'
}
