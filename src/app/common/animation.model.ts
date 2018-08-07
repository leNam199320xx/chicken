import { ActionPosition } from './action.model';

export class AnimationModel {
    start: ActionPosition = new ActionPosition();
    end: ActionPosition = new ActionPosition();
    frameCount = 2;
    // go straight as a line
    goStraight() {
        const animations: ActionPosition[] = [];
        // min count frames is 2
        if (this.frameCount < 2 || !this.frameCount) {
            this.frameCount = 2;
        }
        const animationStep = new ActionPosition();
        animationStep.h = (this.end.h - this.start.h) / (this.frameCount - 1);
        animationStep.w = (this.end.w - this.start.w) / (this.frameCount - 1);
        animationStep.x = (this.end.x - this.start.x) / (this.frameCount - 1);
        animationStep.y = (this.end.y - this.start.y) / (this.frameCount - 1);
        animationStep.rotate = (this.end.rotate - this.start.rotate) / (this.frameCount - 1);
        animationStep.scale = (this.end.scale - this.start.scale) / (this.frameCount - 1);

        animations.push(this.start);

        for (let i = 1; i < this.frameCount - 1; i++) {
            const animationNew = new ActionPosition();
            animationNew.h = this.start.h + animationStep.h * i;
            animationNew.w = this.start.w + animationStep.w * i;
            animationNew.x = this.start.x + animationStep.x * i;
            animationNew.y = this.start.y + animationStep.y * i;
            animationNew.rotate = this.start.rotate + animationStep.rotate * i;
            animationNew.scale = this.start.scale + animationStep.scale * i;
            animations.push(animationNew);
        }
        animations.push(this.end);
        return animations;
    }
}
