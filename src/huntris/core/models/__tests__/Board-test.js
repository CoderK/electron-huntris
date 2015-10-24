import chai from 'chai';
import Board from '../Board.js';
import Block from '../Block.js';
import { SKIP } from '../../../consts/rotate-type.js';

chai.should();

describe('Board.js', () => {
    let sandboxSinon = null;
    let board = null;

    beforeEach(() => {
        sandboxSinon = sinon.sandbox.create();
        board = new Board({
            rows: 10,
            cols: 10
        });
    });

    afterEach(() => {
        sandboxSinon.restore();
        board.resetTables();
    });

    describe('보드에 블럭을 추가할 수 있다.', () => {
        let block;

        beforeEach(() => {
            block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: { x: 2, y: 2 }
            });
        });

        it('다음 등장 예정 블럭을 보드에 추가할 수 있다.', () => {
            // given
            const expectedBlock = board.nextBlock;

            // when
            board.putNextBlock();

            // then
            board.currentBlock.should.be.eql(expectedBlock);
        });
    });

    describe('블럭을 보드에 고정시킬 수 있다.', () => {
        beforeEach(() => {
            board.putNextBlock();
        });

        it('블럭을 보드에 블럭을 고정시킬 수 있다.', () => {
            // given
            // when
            board.fixBlockToTable(board.currentBlock);

            // then
            board._hasBlock(board.currentBlock).should.be.true;
        });

        it('블럭을 보드에 고정한 후 블럭으로 꽉 찬 행을 제거할 수 있다.', () => {
            // given
            fillRowWithBlock(board.blockTable, 0);
            fillRowWithBlock(board.blockTable, 1);

            // when
            board.fixBlockToTable(board.currentBlock);

            // then
            aseertTrueIfRowIsEmpty(board.blockTable, 0);
            aseertTrueIfRowIsEmpty(board.blockTable, 1);
        });

        it('블럭으로 꽉 찬 행을 제거한 후 상단의 블럭을 밑으로 끌어내릴 수 있다.', () => {
            // given
            board.blockTable[0][0] = true;
            board.blockTable[1][1] = true;
            fillRowWithBlock(board.blockTable, 2);

            // when
            board.fixBlockToTable(board.currentBlock);

            // then
            board.blockTable[0][0].should.be.false;
            board.blockTable[1][0].should.be.true;
            board.blockTable[2][1].should.be.true;
        });
    });

    describe('제어하고 있는 블럭을 하강시키고 다음 단계로 진행할 수 있다.', () => {
        let currentBlock;

        beforeEach(() => {
            currentBlock = board.currentBlock;
        });

        it('현재 제어하고 있는 블럭이 더 이동할 곳이 없을 때, 블럭을 현 위치에 고정시키고 새로운 블럭을 추가할 수 있다.', () => {
            // given
            // when
            currentBlock.drop(board.blockTable);
            board.next();

            // then
            assertTrueIfTableHasFixedBlock(board.blockTable, currentBlock);
        });

        it('현재 제어하고 있는 블럭이 계속 이동할 수 있는 위치에 있을 때, 다음 행으로 이동시켜 계속 조작할 수 있다.', () => {
            // given
            sandboxSinon.spy(currentBlock, 'down');

            // when
            board.next();

            // then
            board.currentBlock.should.be.eql(currentBlock);
            currentBlock.down.calledOnce.should.be.true;
        });
    });

    describe('제어 블럭의 위치를 이동시킬 수 있다.', () => {
        it('제어 블럭을 보드 바닥까지 떨어뜨릴 수 있다.', () => {
            // given
            const fSpyDrop = sandboxSinon.spy(board.currentBlock, 'drop');

            // when
            board.dropBlock();

            // then
            fSpyDrop.calledOnce.should.be.true;
        });

        it('제어 블럭을 보드 바닥까지 떨어뜨린 후 바로 새로운 블럭을 추가해야 한다.', () => {
            // given
            const prevBlock = board.currentBlock;

            // when
            board.dropBlock();

            // then
            board.currentBlock.should.be.not.eql(prevBlock);
        });
    });

    function fillRowWithBlock(blockTable, row) {
        blockTable[row].forEach((col, i) => {
            blockTable[row][i] = true;
        });
    }

    function aseertTrueIfRowIsEmpty(blockTable, row) {
        blockTable[row].forEach((col, i) => {
            blockTable[row][i].should.be.false;
        });
    }

    function assertTrueIfTableHasFixedBlock(blockTable, block) {
        const point = block.point;
        block.relPoints.forEach((relPt) => {
            blockTable[relPt.y + point.y][relPt.x + point.x].should.be.true;
        });
    }
});
