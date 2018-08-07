import { TimeLineService, TimeLineAction, StartFrom } from './timeline.service';
import { ActionModel } from './action.model';
export class CommonComponent {
    public tlService: TimeLineService;
    start() {
        this.tlService.start();
    }

    stop() {
        this.tlService.stop();
    }

    loop() {
        this.tlService.isLoop = !this.tlService.isLoop;
    }
    play() {
        if (!this.tlService.isPause) {
            this.tlService.pause();
        } else {
            this.tlService.play();
        }
    }

    addAction() {
        const ac = new TimeLineAction();
        ac.startPosition = StartFrom.start;
        ac.isLoop = true;
        ac.action = new ActionModel();
        ac.action.create();
        ac.action.positionTarget.rotate = 30;
        ac.action.positionCurrent = ac.action.positionTarget;

        this.tlService.actions.push(ac);
        if (this.tlService.mainpage) {
            this.tlService.mainpage.appendChild(ac.action.elementTransform);
        }
    }
}
