export class ActionModel {
    element: HTMLElement = document.createElement('div');
    elementTransform: HTMLElement = document.createElement('div');
    position: ActionPosition = new ActionPosition();
    anchor: AnchorConfig = AnchorConfig.center;
    create() {
        this.element.style.height = this.position.h + 'px';
        this.element.style.width = this.position.w + 'px';
        this.element.className = 'item';
        this.element.style.transform = 'translate(-50%, -50%)';
        this.elementTransform.className = 'item';
        this.elementTransform.appendChild(this.element);
        // this.elementTransform.style.height = this.positionStart.h + 'px';
        // this.elementTransform.style.width = this.positionStart.w + 'px';
        // this.elementTransform.className = 'item';
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
