import { TOGGLE, CLOCKWISE, SKIP } from '../../consts/rotate-type.js';
import Block from './Block.js';

const blockProps = {
    I: {
        relPoints: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 }
        ],
        size: { cols: 4, rows: 1 },
        color: '#C23031',
        rotateType: TOGGLE,
        point: { x: -2, y: 0 }
    },
    L: {
        relPoints: [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 1, y: -1 }
        ],
        size: { cols: 3, rows: 2 },
        color: '#D59430',
        rotateType: CLOCKWISE,
        point: { x: -1, y: 0 }
    },
    S: {
        relPoints: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: 0, y: -1 },
            { x: 1, y: -1 }
        ],
        size: { cols: 3, rows: 2 },
        color: '#003BBD',
        rotateType: TOGGLE,
        point: { x: -1, y: 0 }
    },
    O: {
        relPoints:	[
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 },
            { x: 1, y: 1 }
        ],
        size: { cols: 2, rows: 2 },
        color: '#5EDBDF',
        rotateType: SKIP,
        point: { x: -1, y: 0 }
    },
    J: {
        relPoints: [
            { x: -1, y: -1 },
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 }
        ],
        size: { cols: 3, rows: 2 },
        color: '#FCC63F',
        rotateType: CLOCKWISE,
        point: { x: -1, y: 0 }
    },
    Z: {
        relPoints: [
            { x: 0, y: 0 },
            { x: 0, y: -1 },
            { x: -1, y: -1 },
            { x: 1, y: 0 }
        ],
        size: { cols: 3, rows: 2 },
        color: '#40C77B',
        rotateType: TOGGLE,
        point: { x: -1, y: 0 }
    },
    T: {
        relPoints: [
            { x: 0, y: 0 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: 1 }
        ],
        size: { cols: 3, rows: 2 },
        color: '#A325FB',
        rotateType: CLOCKWISE,
        point: { x: -1, y: 0 }
    }
};

class BlockFactory {
    static createBlock(type) {
        const blockCode = Object.keys(blockProps)[type];
        const props = blockProps[blockCode];
        return new Block(props);
    }

    static createRandomBlock() {
        const randomType = parseInt(Math.random() * Object.keys(blockProps).length, 10);
        return BlockFactory.createBlock(randomType);
    }
}

export default BlockFactory;
