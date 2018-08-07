export class ActionModel {
    element: HTMLElement;
    elementTransform: HTMLElement;
    type = 'div';
    positionTarget: ActionPosition = new ActionPosition();
    positionStart: ActionPosition = new ActionPosition();
    positionCurrent: ActionPosition = new ActionPosition();
    positions: ActionPosition[] = [];
    anchor: AnchorConfig = AnchorConfig.center;
    create() {
        this.elementTransform = document.createElement('div');
        this.element = document.createElement(this.type);
        this.elementTransform.appendChild(this.element);
        this.element.style.height = this.positionStart.h + 'px';
        this.element.style.width = this.positionStart.w + 'px';
        this.element.className = 'item';
        this.element.style.transform = 'translate(-50%, -50%)';
        // this.elementTransform.style.height = this.positionStart.h + 'px';
        // this.elementTransform.style.width = this.positionStart.w + 'px';
        // this.elementTransform.className = 'item';
    }

    translate() {
        this.elementTransform.style.transform = 'translate("' + this.positionCurrent.getX() + '","' + this.positionCurrent.getY() + '")';
    }

    rotate() {
        this.element.style.transform = 'translate(-50%, -50%) rotate("' + this.positionCurrent.rotate + '"deg) scale('
            + this.positionCurrent.scale + ')';
    }

    excute() {
        this.translate();
        this.rotate();
    }

    calculate(_length: number) {
        const stepRotate = Math.round((this.positionTarget.rotate - this.positionStart.rotate) / (_length - 1));
        const stepX = Math.round((this.positionTarget.x - this.positionStart.x) / (_length - 1));
        const stepY = Math.round((this.positionTarget.y - this.positionStart.y) / (_length - 1));

        this.positions.push(this.positionStart);
        for (let i = 0; i < _length; i++) {
            const p = new ActionPosition();
            p.x = this.positionStart.x + i * stepX;
            p.y = this.positionStart.y + i * stepY;
            p.rotate = this.positionStart.rotate + i * stepRotate;
            this.positions.push(p);
        }
        this.positions.push(this.positionTarget);
    }

    config() {
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
    unit = 1;
    h = 30;
    w = 30;
    getX() {
        return this.x * this.unit;
    }
    getY() {
        return this.y * this.unit;
    }
    getRealPosition() {
        return [this.x * this.unit, this.y * this.unit];
    }
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
