import { TimeLineService, TimeLineAction, StartFrom } from './timeline.service';
import { ActionPosition, TypeCubes } from './action.model';
export class CommonComponent {
    public tlService: TimeLineService;
    start() {
        if (this.tlService.mainpage) {
            this.tlService.actions.forEach(e => {
                this.tlService.mainpage.appendChild(e.action.elementTransform);
            });
        }
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
        const st = new ActionPosition();
        const en = new ActionPosition();
        const en2 = new ActionPosition();
        st.rotate = 40;
        st.scale = 1;
        st.x = 40;
        st.y = 40;
        en.rotate = 3600;
        en.scale = 3;
        en.x = 300;
        en.y = 400;
        const ac = new TimeLineAction();
        ac.startPosition = StartFrom.start;
        ac.animation.start = st;
        ac.animation.end = en;
        this.tlService.actions.push(ac);
        ac.action.create();

        en2.rotate = 3600;
        en2.scale = 6;
        en2.x = 300;
        en2.y = 400;
        const ac2 = new TimeLineAction();
        ac2.animation.start = st;
        ac2.animation.end = en2;
        ac2.startPosition = StartFrom.start;
        this.tlService.actions.push(ac2);
        ac2.action.create(TypeCubes.circle);
    }
}
