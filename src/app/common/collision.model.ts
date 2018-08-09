import { ActionModel, TypeCubes } from './action.model';

export class CollisionModel {
    root: ActionModel;
    targets: ActionModel[] = [];
    wall: Box = new Box();
    configTargets() {

    }
    setWall(
        _leftTopCorner: Point,
        _rightTopCorner: Point,
        _leftBottomCorner: Point,
        _rightBottomCorner: Point,
    ) {
        this.wall.leftTopCorner = _leftTopCorner;
        this.wall.rightTopCorner = _rightTopCorner;
        this.wall.leftBottomCorner = _leftBottomCorner;
        this.wall.rightBottomCorner = _rightBottomCorner;
        this.wall.lineTop = this.line(this.wall.leftTopCorner, this.wall.rightTopCorner);
        this.wall.lineBottom = this.line(this.wall.leftBottomCorner, this.wall.rightBottomCorner);
        this.wall.lineLeft = this.line(this.wall.leftTopCorner, this.wall.leftBottomCorner);
        this.wall.lineRight = this.line(this.wall.rightTopCorner, this.wall.rightBottomCorner);
        console.log(this.wall);
        return false;
    }
    check() {
        const wallResults = this.checkRootAndWall();
        return wallResults;
    }
    checkRootAndWall(): WallCollisionResult[] {
        if (!this.wall) {
            return [];
        }

        const _t = this.checkLineAndCircle(this.wall.lineTop, this.root);
        const _b = this.checkLineAndCircle(this.wall.lineBottom, this.root);
        const _l = this.checkLineAndCircle(this.wall.lineLeft, this.root);
        const _r = this.checkLineAndCircle(this.wall.lineRight, this.root);
        const results: WallCollisionResult[] = [];
        let val = (_t === StateOfCollision.touch || _t === StateOfCollision.cut)
            ? results.push(new WallCollisionResult(_t, WallPosition.top)) : null;
        val = (_b === StateOfCollision.touch || _b === StateOfCollision.cut)
            ? results.push(new WallCollisionResult(_b, WallPosition.bottom)) : null;
        val = (_l === StateOfCollision.touch || _l === StateOfCollision.cut)
            ? results.push(new WallCollisionResult(_l, WallPosition.left)) : null;
        val = (_r === StateOfCollision.touch || _r === StateOfCollision.cut)
            ? results.push(new WallCollisionResult(_r, WallPosition.right)) : null;
        return results;
    }
    checkLineAndCircle(_line: number[], _point: ActionModel): StateOfCollision {
        if (_line && _point && _point.typeCubes === TypeCubes.circle) {
            const distance = Math.abs(_line[0] * _point.position.x + _line[1] * _point.position.y)
                / Math.sqrt(_line[0] * _line[0] + _line[1] * _line[1]);
            if (distance < _point.radius[0]) {
                return StateOfCollision.cut;
            } else if (distance === _point.radius[0]) {
                return StateOfCollision.touch;
            } else {
                return StateOfCollision.nocut;
            }
        }
        return -1;
    }
    line(_pointStart = new Point(0, 0), _pointEnd = new Point(0, 0)) {
        if (_pointEnd.x === _pointStart.x) {
            return [_pointEnd.x, 0];
        }
        if (_pointEnd.y === _pointStart.y) {
            return [1, 0];
        }
        const a = (_pointEnd.y - _pointStart.y) / (_pointEnd.x - _pointStart.x);
        const b = _pointEnd.y - a * _pointEnd.x;
        return [a, b];
    }
}

export class WallCollisionResult {
    message: string;
    state: StateOfCollision;
    wallPosition: WallPosition;
    points: Point[] = [];
    constructor(
        _st: StateOfCollision = null,
        _wallPosition: WallPosition = null,
        _message = 'no message',
        _pointsOfCollision: Point[] = []
    ) {
        this.state = _st;
        this.wallPosition = _wallPosition;
        this.message = _message;
        this.points = _pointsOfCollision;
    }
}

export class Box {
    rightTopCorner: Point;
    leftTopCorner: Point;
    rightBottomCorner: Point;
    leftBottomCorner: Point;
    lineTop: number[];
    lineBottom: number[];
    lineLeft: number[];
    lineRight: number[];
}

export class Point {
    constructor(_x = 0, _y = 0) {
        this.x = _x;
        this.y = _y;
    }
    x: number;
    y: number;
}

export enum StateOfCollision {
    cut = 0,
    nocut = 1,
    touch = 2,
    fail = -1
}

export enum WallPosition {
    top = 0,
    left = 1,
    right = 2,
    bottom = 3
}
