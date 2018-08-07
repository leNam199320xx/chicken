import { Injectable } from '@angular/core';
import { ActionModel } from './action.model';

@Injectable()
export class TimeLineService {
    fpsDefault = 60;
    fps = 60;
    frame = 0;
    frameEnd = 100;
    timeend = 600; // milisecond
    isLoop = false;
    hasActionLoop = false;
    mainpage: HTMLElement;
    actions: TimeLineAction[] = [];
    actionsFromStart: TimeLineAction[] = [];
    actionsContinue: TimeLineAction[] = [];
    actionsContinueStartFrame = 0;
    timeline: any;
    isPause = false;
    isPlay = false;
    startTime: number;
    currentTime: number;
    previousTime: number;
    currentFrame = 0;
    actionsLength = this.actions.length;
    actionFrame: number;
    d = document.createElement('label');
    start() {
        if (this.isPlay) {
            return;
        }
        this.isPlay = true;
        this.isPause = false;
        this.frameEnd = Math.round(this.timeend / this.fpsDefault);
        this.startTime = Date.now();
        this.currentTime = Date.now();
        this.currentFrame = 0;
        this.hasActionLoop = false;
        this.resetAction();
        this.render();
        document.body.appendChild(this.d);
    }

    render() {
        if (this.isPause || !this.isPlay) {
            this.previousTime = undefined;
            return;
        }
        this.timeline = requestAnimationFrame((res) => {
            this.render();
        });
        this.currentTime = Date.now();
        const tick = (this.currentTime - this.previousTime);
        // -------------ACTION----------------
        if (tick) {
            this.fps = 1000 / tick;
            // -------------------------------
            for (let j = 0, jl = this.actionsFromStart.length; j < jl; j++) {
                const act = this.actionsFromStart[j];
                if (!act.isLoop) {
                    if (act.startPosition === StartFrom.start
                        && this.currentFrame >= act.frameStart
                        && this.currentFrame < act.frameEnd) {
                        act.run(this.currentFrame - act.frameStart);
                    }
                } else {
                    this.hasActionLoop = true;
                    if (act.startPosition === StartFrom.start && this.currentFrame >= act.frameStart) {
                        act.run((this.currentFrame - act.frameStart) % act.framePass);
                    }
                }
            }
            for (let i = 0, il = this.actionsContinue.length; i < il; i++) {
                const act = this.actionsContinue[i];
                if (!act.isLoop) {
                    if (act.startPosition === StartFrom.continue
                        && this.currentFrame >= act.frameStart
                        && this.currentFrame < act.frameEnd) {
                        act.run(this.currentFrame - act.frameStart);
                    }
                } else {
                    this.hasActionLoop = true;
                    if (act.startPosition === StartFrom.continue && this.currentFrame >= act.frameStart) {
                        act.run((this.currentFrame - act.frameStart) % act.framePass);
                    }
                }
            }
            // -------------------------------
            this.currentFrame++;
            if (this.currentFrame === this.frameEnd && !this.hasActionLoop) {
                if (this.isLoop) {
                    this.currentFrame = 0;
                } else {
                    this.stop();
                }
            }
        }
        // -----------------------------------
        this.previousTime = this.currentTime;
        this.d.textContent = this.fps.toString();
    }

    play() {
        this.isPause = false;
        this.render();
    }

    pause() {
        this.isPause = true;
    }

    stop() {
        this.isPlay = false;
        cancelAnimationFrame(this.timeline);
    }

    resetAction() {
        this.actionsLength = this.actions.length;
        let start = 0;
        let end = 0;
        for (let i = 0; i < this.actionsLength; i++) {
            this.actions[i].setFrame();
            const act = this.actions[i];
            start = (act.frameStart > start) ? act.frameStart : start;
            end = (act.frameEnd > end) ? act.frameEnd : end;
            if (act.startPosition === StartFrom.start) {
                this.actionsContinueStartFrame = end;
                this.actionsFromStart.push(act);
            } else {
                this.actionsContinue.push(act);
            }
        }
        if (this.actionsFromStart.length === 0) {
            this.actionsContinueStartFrame = 0;
        }
        if (this.actionsContinue.length > 0) {
            for (let i = 0; i < this.actionsContinue.length; i++) {
                const act = this.actionsContinue[i];
                act.frameStart += this.actionsContinueStartFrame;
                act.frameEnd += this.actionsContinueStartFrame;
                this.actionsContinueStartFrame += act.frameEnd;
                start = (act.frameStart > start) ? act.frameStart : start;
                end = (act.frameEnd > end) ? act.frameEnd : end;
            }
        }
        // if (start + end > this.frameEnd) {
        this.frameEnd = end;
        // }
    }

    getCurrentFrame() {
        return {
            currentFrame: this.currentFrame
        };
    }
}

export class TimeLineAction {
    constructor(public fps = 60) {

    }
    name = 'default';
    time = 1000;
    delay = 0;
    startPosition: StartFrom = StartFrom.continue;
    frameStart = 0;
    frameEnd = 0;
    currentActionFrame = 0;
    action: ActionModel;
    framePass = 0;
    isDone = false;
    isLoop = false;
    tick = 16;
    setFrame() {
        if (this.fps > 0 && this.delay >= 0 && this.time > 0) {
            this.tick = 1000 / this.fps;
            this.frameStart = (Math.round(this.delay / this.tick));
            this.framePass = (Math.round(this.time / this.tick));
            this.frameEnd = this.frameStart + this.framePass;
        } else {
            this.frameStart = 0;
            this.frameEnd = 0;
        }
        return this;
    }

    setFps(_fps: number) {
        this.fps = _fps;
    }

    run(_frame: number) {
        this.currentActionFrame = _frame;
        // const _run = (typeof (this.action) === 'function') ? this.action() : null;
        this.isDone = this.framePass === this.currentActionFrame;
        if (this.action) {
            this.action.excute();
        }
        // return _run;
    }
}

export enum StartFrom {
    start = 0,
    continue = 1,
    end = 2
}
