import { CollisionModel, Box, Point } from './collision.model';

export class ActionModel {
    element: HTMLElement = document.createElement('div');
    elementTransform: HTMLElement = document.createElement('div');
    position: ActionPosition = new ActionPosition();
    anchor: AnchorConfig = AnchorConfig.center;
    typeCubes = TypeCubes.rectangle;
    diameters: number[] = [];
    radius: number[] = [];
    collision: CollisionModel = new CollisionModel();
    create(
        _typeCubes = this.typeCubes,
        _width = this.position.w,
        _height = this.position.h
    ) {
        if (_typeCubes === TypeCubes.circle) {
            _height = _width;
            this.element.style.borderRadius = '50%';
            this.diameters.push(_width);
            this.radius.push(_width / 2);
        } else if (_typeCubes === TypeCubes.square) {
            _height = _width;
        }
        this.position.w = _width;
        this.position.h = _height;
        this.element.style.height = _height + 'px';
        this.element.style.width = _width + 'px';
        this.element.className = 'item';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.elementTransform.className = 'item';
        this.elementTransform.appendChild(this.element);
        this.collision.root = this;
        this.collision.setWall(new Point(0, 0), new Point(100, 0), new Point(0, 200), new Point(100, 200));
    }

    translate() {
        this.elementTransform.style.transform = 'translate(' + this.position.x + 'px,' + this.position.y + 'px)';
    }

    rotate() {
        this.element.style.transform = 'translate(-50%, -50%) rotate('
            + this.position.rotate + 'deg) scale('
            + this.position.scale + ')';
    }

    excute(_position: ActionPosition) {
        this.position = _position;
        this.translate();
        this.rotate();
        const re = this.collision.check();
        console.log(re);
    }
}
export enum ActionConfig {
    minX = 0,
    minY = 0,
    maxX = 320,
    maxY = 480
}
export class ActionPosition {
    x = 0;
    y = 0;
    rotate = 0;
    scale = 1;
    h = 30;
    w = 30;
}

export enum AnchorConfig {
    center = 'center',
    left = 'centerleft',
    right = 'centerright',
    top = 'top',
    bottom = 'bottom',
    topleft = 'topleft',
    topright = 'topright',
    bottomleft = 'bottomleft',
    bottomright = 'bottomright'
}

export enum TypeCubes {
    rectangle = 0,
    square = 1,
    circle = 2,
    ellipse = 3
}
