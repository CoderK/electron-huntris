class StatePanelView {

    constructor(props) {
        this._assignProperties(props);
    }

    initialize() {
        this._attachEvents();
        this.render(this._board.nextBlock);
    }

    _assignProperties(props) {
        this._board = props.board;
        this._canvas = props.canvas;
        this._unitSize = props.unitSize;
        this._width = this._canvas.width;
        this._height = this._canvas.height;
        this._ctx = this._canvas.getContext('2d');
    }

    _attachEvents() {
        this._board.on('changedCurrentBlock', this.render.bind(this));
    }

    render(block) {
        this.clear();
        this.drawBlockPreview(block);
    }

    _decideEdgePosition(relPoints) {
        const initValue = { edgeX: 0, edgeY: 0 };
        const adjustPoint = relPoints.reduce(({ edgeX, edgeY }, { x, y }) => ({
            edgeX: edgeX > x ? x : edgeX,
            edgeY: edgeY > y ? y : edgeY
        }), initValue);

        return {
            edgeX: Math.abs(adjustPoint.edgeX),
            edgeY: Math.abs(adjustPoint.edgeY)
        };
    }

    drawBlockPreview(block) {
        const { color, size } = block;
        const ctx = this._ctx;
        const width = this._width;
        const height = this._height;
        const unitSize = this._unitSize;

        const offsetX = (width - (size.cols * parseInt(unitSize, 10))) / 2;
        const offsetY = (height - (size.rows * parseInt(unitSize, 10))) / 2;
        const { edgeX, edgeY } = this._decideEdgePosition(block.relPoints);

        ctx.fillStyle = color;
        ctx.strokeStyle = '#000';

        block.relPoints.forEach(relPt => {
            ctx.fillRect(
                offsetX + ((relPt.x + edgeX) * unitSize),
                offsetY + ((relPt.y + edgeY) * unitSize),
                unitSize,
                unitSize
            );
            ctx.strokeRect(
                offsetX + ((relPt.x + edgeX) * unitSize),
                offsetY + ((relPt.y + edgeY) * unitSize),
                unitSize,
                unitSize
            );
        });
    }

    clear() {
        this._ctx.fillStyle = '#fff';
        this._ctx.strokeStyle = '#000';
        this._ctx.fillRect(0, 0, this._width, this._height);
        this._ctx.strokeRect(0, 0, this._width, this._height);
    }
}

export default StatePanelView;
