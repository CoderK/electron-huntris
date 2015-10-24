import chai from 'chai';

import { LEFT, UP, RIGHT, DOWN, PERIOD } from '../../../consts/keycode.js';
import Board from '../../models/Board.js';
import Scorer from '../../models/Scorer.js';
import BoardPanelView from '../BoardPanelView.js';

chai.should();

describe('BoardPanelView.js', () => {
    let sandboxSinon = null;

    let board;
    let scorer;
    let boardPanelView;

    beforeEach(() => {
        sandboxSinon = sinon.sandbox.create();
        board = new Board();
        scorer = new Scorer();
        boardPanelView = new BoardPanelView({
            board,
            scorer,
            config: {}
        });
        boardPanelView.initialize();
    });

    afterEach(() => {
        sandboxSinon.restore();
    });

    it('현재 제어하고 있는 블럭을 보드에 렌더링할 수 있다.', () => {
        // given
        const block = board.currentBlock;
        sandboxSinon.stub(boardPanelView._ctx, 'fillRect');

        // when
        boardPanelView._drawControlBlock(block);

        // then
        assertTrueThatBlockWasRendered(boardPanelView, block);
    });

    describe('현재 제어하고 있는 블럭를 조작할 수 있다.', () => {
        it('왼쪽 방향키를 입력해서 블럭을 왼쪽으로 이동시킬 수 있다.', () => {
            // given
            // when
            const fStubLeft = sandboxSinon.spy(board, 'moveLeft');
            boardPanelView._handleKeyEvent({ which: LEFT });

            // then
            fStubLeft.calledOnce.should.be.true;
        });

        it('왼쪽 방향키를 입력해서 블럭을 회전시킬 수 있다.', () => {
            // given
            // when
            const fStubLeft = sandboxSinon.spy(board, 'rotateBlock');
            boardPanelView._handleKeyEvent({ which: UP, preventDefault: () => {} });

            // then
            fStubLeft.calledOnce.should.be.true;
        });

        it('오른쪽 방향키를 입력해서 블럭을 오른쪽으로 이동시킬 수 있다.', () => {
            // given
            // when
            const fStubLeft = sandboxSinon.spy(board, 'moveRight');
            boardPanelView._handleKeyEvent({ which: RIGHT, preventDefault: () => {} });

            // then
            fStubLeft.calledOnce.should.be.true;
        });

        it('아래 방향키를 입력해서 블럭을 보드의 최하단으로 이동시킬 수 있다.', () => {
            // given
            // when
            const fStubLeft = sandboxSinon.spy(board, 'moveDown');
            boardPanelView._handleKeyEvent({ which: DOWN, preventDefault: () => {} });

            // then
            fStubLeft.calledOnce.should.be.true;
        });

        it('마침표(.)키를 입력해서 블럭 하강 속도를 높일 수 있다.', () => {
            // given
            // when
            const fStubLeft = sandboxSinon.spy(scorer, 'speedUp');
            boardPanelView._handleKeyEvent({ which: PERIOD, preventDefault: () => {} });

            // then
            fStubLeft.calledOnce.should.be.true;
        });
    });

    function assertTrueThatBlockWasRendered(renderer, block) {
        const point = block.point;
        const unitSize = renderer._unitSize;
        const ctx = renderer._ctx;

        block.relPoints.forEach((relPt) => {
            const startX = (relPt.x + point.x) * unitSize;
            const startY = (relPt.y + point.y) * unitSize;
            const width = unitSize;
            const height = unitSize;

            ctx.fillRect.calledWith(startX, startY, width, height).should.be.true;
        });
    }
});
