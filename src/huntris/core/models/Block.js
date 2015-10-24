import { TOGGLE, SKIP } from '../../consts/rotate-type.js';
import BlockFactory from './BlockFactory.js';

class Block {
    static createRandomBlock() {
        return BlockFactory.createRandomBlock();
    }

    constructor(props = {}) {
        this.type =	props.type;
        this.rotateType	= props.rotateType;
        this.color = props.color;
        this.relPoints = props.relPoints;
        this.point = props.point;
        this.size = props.size;
        this.rotateFlag	= false;
    }

    _rotateRelPoints(relPoints, deltaX, deltaY) {
        return relPoints.map((relPt) => ({
            x: this._rotateX(relPt.y, deltaX),
            y: this._rotateY(relPt.x, deltaY)
        }));
    }

    _rotateY(x, nY) {
        return (x) * nY === -0 ? 0 : (x) * nY;
    }

    _rotateX(y, nX) {
        return (y) * nX === -0 ? 0 : (y) * nX;
    }

    rotate(blockTables) {
        if (this.rotateType === SKIP) {
            return;
        }

        const rotatedRelPoints = this._calculateRotatedRelPoints();
        const shouldSkip = rotatedRelPoints.some(
            relPt => this._shouldCancelRotate(blockTables, this.point, relPt)
        );

        if (shouldSkip) {
            return;
        }

        this.rotateFlag = !this.rotateFlag;
        this.relPoints = rotatedRelPoints;
    }

    _shouldCancelRotate(blockTables, point, relPt) {
        const { x, y } = point;
        const relX = relPt.x;
        const relY = relPt.y;

        return this._hasObstacle(blockTables, x, y, relX, relY);
    }

    _hasBlock(blockTables, x, y, relX, relY) {
        return blockTables[y + relY][x + relX];
    }

    _isOutside(blockTables, x, y, relX, relY) {
        const rows = blockTables.length;
        const cols = blockTables[0].length;
        const currentX = x + relX;
        const currentY = y + relY;

        return this._isCrossLeftBorder(currentX, cols)
            || this._isCrossRightBorder(currentY, rows);
    }

    _isCrossRightBorder(currentY, rows) {
        return currentY > rows - 1;
    }

    _isCrossLeftBorder(currentX, cols) {
        return currentX < 0 || currentX > cols - 1;
    }

    _hasObstacle(blockTables, x, y, relX, relY) {
        return this._isOutside(blockTables, x, y, relX, relY)
        || this._hasBlock(blockTables, x, y, relX, relY);
    }

    _calculateRotatedRelPoints() {
        if (this.rotateType === TOGGLE) {
            return this._rotateToggle();
        } else {
            return this._rotateClockwise();
        }
    }

    _rotateClockwise() {
        return this._rotateRelPoints(this.relPoints, -1, 1);
    }

    _rotateToggle() {
        if (this.rotateFlag) {
            return this._rotateRelPoints(this.relPoints, 1, -1);
        } else {
            return this._rotateRelPoints(this.relPoints, -1, 1);
        }
    }

    down(blockTables) {
        const { x, y } = this.point;
        const wasBlocked = this._canMoveToDown(blockTables, x, y);

        if (wasBlocked === false) {
            this.point.y++;
        }

        return !wasBlocked;
    }

    _canMoveToDown(blockTables, x, y) {
        return this.relPoints.some(
            relPt => this._hasObstacle(blockTables, x, y + 1, relPt.x, relPt.y)
        );
    }

    _canMoveToLeft(blockTables, x, y) {
        return this.relPoints.some(
            relPt => this._hasObstacle(blockTables, x - 1, y, relPt.x, relPt.y)
        );
    }

    _canMoveToRight(blockTables, x, y) {
        return this.relPoints.some(
            relPt => this._hasObstacle(blockTables, x + 1, y, relPt.x, relPt.y)
        );
    }

    drop(blockTables) {
        while (true) {
            if (this.down(blockTables)) {
                continue;
            }
            break;
        }
    }

    left(blockTables) {
        const { x, y } = this.point;
        const wasBlocked = this._canMoveToLeft(blockTables, x, y);

        if (wasBlocked === false) {
            this.point.x--;
        }
    }

    right(blockTables) {
        const { x, y } = this.point;
        const wasBlocked = this._canMoveToRight(blockTables, x, y);

        if (wasBlocked === false) {
            this.point.x++;
        }
    }

    moveTo(newPoint) {
        this.point = newPoint;
    }
}

export default Block;
