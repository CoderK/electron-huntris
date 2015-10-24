import Block from '../Block.js';
import chai from 'chai';
import { TOGGLE, SKIP, CLOCKWISE } from '../../../consts/rotate-type.js';

const expect = chai.expect;
chai.should();

describe('Block.js', () => {
    const rotableBlockTables = createEmptyTable();

    it('SKIP 타입 블럭은 회전시킬 수 없다.', () => {
        // given
        const originalRelPoints = [];
        const skipBlock = new Block({
            relPoints: originalRelPoints,
            rotateType: SKIP,
            point: { x: 2, y: 2 }
        });

        // when
        skipBlock.rotate();
        skipBlock.rotate();
        skipBlock.rotate();

        // then
        skipBlock.relPoints.should.be.eql(originalRelPoints);
    });

    describe('TOGGLE 타입의 블럭을 회전시킬 수 있다.', () => {
        const originalRelPoints = [
            { x: -1, y: 0 },
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 }
        ];
        let toggleBock;

        beforeEach(() => {
            toggleBock = new Block({
                relPoints: originalRelPoints,
                rotateType: TOGGLE,
                point: { x: 2, y: 2 }
            });
        });

        it('TOGGLE 타입의 블럭을 180도 회전시킬 수 있다.', () => {
            // given
            // when
            toggleBock.rotate(rotableBlockTables);

            // then
            expect(toggleBock.relPoints).to.deep.equal([
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 }
            ]);
        });

        it('TOGGLE 타입의 블럭을 360도 회전시켜 원상태로 되돌릴 수 있다.', () => {
            // given
            // when
            toggleBock.rotate(rotableBlockTables);
            toggleBock.rotate(rotableBlockTables);

            // then
            expect(toggleBock.relPoints).to.deep.equal([
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 },
                { x: 2, y: 0 }
            ]);
        });

        it('회전 후 블럭이 위치할 자리에 다른 블럭이 있다면 블럭을 회전시키지 않는다.', () => {
            // given
            const leftBlockedTable = createTableHavingObstacle(toggleBock, { x: 0, y: 1 });

            // when
            toggleBock.rotate(leftBlockedTable);

            // then
            expect(toggleBock.relPoints).to.deep.equal(originalRelPoints);
        });

        it('회전 후 블럭의 위치가 테이블의 좌측 경계 밖에 있다면 블럭을 회전시키지 않는다.', () => {
            // given
            toggleBock.point = { x: -1000, y: 2 };

            // when
            toggleBock.rotate(rotableBlockTables);

            // then
            expect(toggleBock.relPoints).to.deep.equal(originalRelPoints);
        });

        it('회전 후 블럭의 위치가 테이블의 우측 경계 밖에 있다면 블럭을 회전시키지 않는다.', () => {
            // given
            toggleBock.point = { x: 1000, y: 2 };

            // when
            toggleBock.rotate(rotableBlockTables);

            // then
            expect(toggleBock.relPoints).to.deep.equal(originalRelPoints);
        });

        it('회전 후 블럭의 위치가 테이블의 하단 경계 밖에 있다면 블럭을 회전시키지 않는다.', () => {
            // given
            toggleBock.point = { x: 2, y: 10000 };

            // when
            toggleBock.rotate(rotableBlockTables);

            // then
            expect(toggleBock.relPoints).to.deep.equal(originalRelPoints);
        });
    });

    describe('CLOCKWISE 타입의 블럭을 회전시킬 수 있다.', () => {
        let clockWiseBlock = null;

        beforeEach(() => {
            clockWiseBlock = new Block({
                relPoints: [
                    { x: -1, y: -1 },
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 }
                ],
                rotateType: CLOCKWISE,
                point: { x: 2, y: 2 }
            });
        });

        it('CLOCKWISE 타입의 블럭을 시계방향으로 90도 회전시킬 수 있다.', () => {
            // given
            // when
            clockWiseBlock.rotate(rotableBlockTables);

            // then
            expect(clockWiseBlock.relPoints).to.deep.equal([
                { x: 1, y: -1 },
                { x: 0, y: -1 },
                { x: 0, y: 0 },
                { x: 0, y: 1 }
            ]);
        });

        it('CLOCKWISE 타입의 블럭을 시계방향으로 180도 회전시킬 수 있다.', () => {
            // given
            // when
            clockWiseBlock.rotate(rotableBlockTables);
            clockWiseBlock.rotate(rotableBlockTables);

            // then
            expect(clockWiseBlock.relPoints).to.deep.equal([
                { x: 1, y: 1 },
                { x: 1, y: 0 },
                { x: 0, y: 0 },
                { x: -1, y: 0 }
            ]);
        });

        it('CLOCKWISE 타입의 블럭을 시계방향으로 270도 회전시킬 수 있다.', () => {
            // given
            // when
            clockWiseBlock.rotate(rotableBlockTables);
            clockWiseBlock.rotate(rotableBlockTables);
            clockWiseBlock.rotate(rotableBlockTables);

            // then
            expect(clockWiseBlock.relPoints).to.deep.equal([
                { x: -1, y: 1 },
                { x: 0, y: 1 },
                { x: 0, y: 0 },
                { x: 0, y: -1 }
            ]);
        });

        it('CLOCKWISE 타입의 블럭을 시계방향으로 360도 회전시켜 원상태로 되돌릴 수 있다.', () => {
            // given
            // when
            clockWiseBlock.rotate(rotableBlockTables);
            clockWiseBlock.rotate(rotableBlockTables);
            clockWiseBlock.rotate(rotableBlockTables);
            clockWiseBlock.rotate(rotableBlockTables);

            // then
            expect(clockWiseBlock.relPoints).to.deep.equal([
                { x: -1, y: -1 },
                { x: -1, y: 0 },
                { x: 0, y: 0 },
                { x: 1, y: 0 }
            ]);
        });
    });

    describe('블럭을 하강시킬 수 있다.', () => {
        it('하단에 장애물이 없다면 블럭을 하강시킬 수 있다.', () => {
            // gievn
            const block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: { x: 2, y: 2 }
            });

            // when
            const wasDown = block.down(rotableBlockTables);

            // then
            wasDown.should.be.true;
        });

        it('하단에 장애물이 없다면 블럭을 하강시킬 수 없다.', () => {
            // gievn
            const pointOnFloor = { x: 2, y: rotableBlockTables.length - 1 };
            const block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: pointOnFloor
            });

            // when
            const wasDown = block.down(rotableBlockTables);

            // then
            wasDown.should.be.false;
        });

        it('블럭을 테이블의 가장 밑바닥까지 하강시킬 수 있다.', () => {
            // given
            const block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: { x: 2, y: 2 }
            });
            const bottomY = rotableBlockTables.length - 1;

            // when
            block.drop(rotableBlockTables);

            // then
            block.point.y.should.be.eql(bottomY);
        });
    });

    describe('블럭을 좌측으로 이동시킬 수 있다.', () => {
        it('블럭을 좌측으로 이동시킬 수 있다.', () => {
            // given
            const block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: { x: 2, y: 2 }
            });
            const expectedX = block.point.x - 1;

            // when
            block.left(rotableBlockTables);

            // then
            block.point.x.should.be.eql(expectedX);
        });

        it('좌측에 장애물이 있다면 블럭을 좌측으로 이동시킬 수 없다.', () => {
            // given
            const block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: { x: 1, y: 2 }
            });
            const expectedX = block.point.x;

            // when
            block.left(rotableBlockTables);

            // then
            block.point.x.should.be.eql(expectedX);
        });
    });

    describe('블럭을 우측으로 이동시킬 수 있다.', () => {
        it('블럭을 우측으로 이동시킬 수 있다.', () => {
            // given
            const block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: { x: 2, y: 2 }
            });
            const expectedX = block.point.x + 1;

            // when
            block.right(rotableBlockTables);

            // then
            block.point.x.should.be.eql(expectedX);
        });

        it('우측에 장애물이 있다면 블럭을 좌측으로 이동시킬 수 없다.', () => {
            // given
            const block = new Block({
                relPoints: [
                    { x: -1, y: 0 },
                    { x: 0, y: 0 },
                    { x: 1, y: 0 },
                    { x: 2, y: 0 }
                ],
                rotateType: SKIP,
                point: { x: rotableBlockTables[0].length - 1, y: 2 }
            });
            const expectedX = block.point.x;

            // when
            block.right(rotableBlockTables);

            // then
            block.point.x.should.be.eql(expectedX);
        });
    });


    function createTableHavingObstacle(block, relPt) {
        const { x, y } = block.point;
        const notRotableBlockTables = createEmptyTable();
        notRotableBlockTables[y + relPt.y][x + relPt.x] = true;

        return notRotableBlockTables;
    }

    function createEmptyTable() {
        // create empty 6 x 6 table.
        return Array.apply(null, Array(6)).map(() => [false, false, false, false, false, false]);
    }
});
