import BoardPanelView from '../../core/ui/BoardPanelView.js';
import StatePanelView from '../../core/ui/StatePanelView.js';

class GameRenderer {

    constructor({
        board,
        scorer,
        unitSize,
        height,
        width,
        boardCanvas,
        stateCanvas
        }) {
        this._boardPanelView = new BoardPanelView({
            board,
            scorer,
            canvas: boardCanvas,
            config: {
                unitSize,
                width,
                height
            }
        });

        this._statePanelView = new StatePanelView({
            board,
            unitSize,
            width,
            height,
            canvas: stateCanvas
        });
    }

    initialize() {
        this._boardPanelView.initialize();
        this._statePanelView.initialize();
    }
}

export default GameRenderer;
