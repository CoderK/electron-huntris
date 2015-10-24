import chai from 'chai';
import Scorer from '../Scorer.js';

chai.should();

describe('Scorer.js', () => {
    const defaultIntervalUnit = 500;
    const intervalUnit = 10;

    let sandboxSinon;
    let scorer;

    beforeEach(() => {
        sandboxSinon = sinon.sandbox.create();
        scorer = new Scorer({
            animateInterval: defaultIntervalUnit,
            intervalUnit
        });
    });

    afterEach(() => {
        sandboxSinon.restore();
    });

    describe('점수 계산기를 생성하면', () => {
        it('초기 레벨은 0이어야 한다', () => {
            // given
            // when
            // then
            scorer.score.should.be.eql(0);
        });

        it('초기 점수는 0이어야 한다', () => {
            // given
            // when
            // then
            scorer.score.should.be.eql(0);
        });

        it('초기 게임 속도는 700ms이어야 한다.', () => {
            // given
            // when
            // then
            scorer.animateInterval.should.be.eql(defaultIntervalUnit);
        });
    });

    it('제거한 블럭 개수당 100점씩 현재 점수에 추가할 수 있다.', () => {
        // given
        const removeLineCount = 10;
        const prevScore = scorer.score;
        const expectedScore = prevScore + 10 * 100;

        // when
        scorer.addScore(removeLineCount);

        // then
        scorer.score.should.be.eql(expectedScore);
    });

    it('1000점을 넘을 때마다 레벨을 하나씩 올릴 수 있다.', () => {
        // given
        const removeLineCount = 10;
        const expectedLevel = 3;

        // when
        scorer.addScore(removeLineCount);
        scorer.addScore(removeLineCount);
        scorer.addScore(removeLineCount);

        // then
        scorer.level.should.be.eql(expectedLevel);
    });

    it('레벨이 하나씩 오를 때마다 게임 속도를 한 단계씩 높일 수 있다.', () => {
        // given
        const prevAnimateInterval = scorer.animateInterval;
        const expectedInterval = prevAnimateInterval - intervalUnit;

        // when
        scorer.addScore(10);    // 1000

        // then
        scorer.animateInterval.should.be.eql(expectedInterval);
    });

    it('속도를 강제로 한 단계씩 높일 수 있다.', () => {
        // given
        const prevAnimateInterval = scorer.animateInterval;
        const expectedInterval = prevAnimateInterval - (intervalUnit * 3);

        // when
        scorer.speedUp();
        scorer.speedUp();
        scorer.speedUp();

        // then
        scorer.animateInterval.should.be.eql(expectedInterval);
    });
});
