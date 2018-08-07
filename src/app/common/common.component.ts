import { TimeLineService, TimeLineAction, StartFrom } from './timeline.service';
export class CommonComponent {
    private tlService: TimeLineService;
    start() {
        const ac = new TimeLineAction();
        const ac1 = new TimeLineAction();
        const ac2 = new TimeLineAction();
        ac.startPosition = StartFrom.start;
        this.tlService.actions.push(ac);
        this.tlService.actions.push(ac);
        this.tlService.actions.push(ac);

        this.tlService.actions.push(ac1);
        ac2.delay = 3000;
        this.tlService.actions.push(ac2);
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
}
