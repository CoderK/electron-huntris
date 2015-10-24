import React, { PropTypes } from 'react';

import { DEFAULT_GAME_SPEED, INTERVAL_UNIT } from './config.js';
import Board from './core/models/Board.js';
import GameRenderer from './core/ui/GameRenderer.js';
import Scorer from './core/models/Scorer.js';

class Huntris extends React.Component {
    render() {
        const { width, height, style, unitSize } = this.props;
        return (
            <div style={style}>
                <canvas
                    ref='boardCanvas'
                    width={width}
                    height={height}
                />
                <canvas
                    ref='stateCanvas'
                    width={unitSize * 5}
                    height={unitSize * 5}
                    style={{
                        position: 'absolute',
                        marginLeft: '10px'
                    }}
                />
            </div>
        );
    }

    componentDidMount() {
        const { width, height, unitSize } = this.props;
        const { boardCanvas, stateCanvas } = this.refs;
        const gameRenderer = new GameRenderer({
            board: new Board({
                rows: Math.floor(height / unitSize),
                cols: Math.floor(width / unitSize)
            }),
            scorer: new Scorer({
                animateInterval: DEFAULT_GAME_SPEED,
                intervalUnit: INTERVAL_UNIT
            }),
            unitSize,
            height,
            width,
            boardCanvas,
            stateCanvas
        });

        gameRenderer.initialize();
    }
}

Huntris.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    unitSize: PropTypes.string,
    style: PropTypes.object
};

export default Huntris;
