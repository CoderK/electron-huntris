'use strict';

module.exports = function (config) {
    let browsers = ['Chrome'];
    let reporters = ['mocha'];
    let preprocessors = ['webpack', 'sourcemap'];

    const webpack = {
        devtool: 'inline-source-map',
        isparta: {
            embedSource: true,
            noAutoWrap: true,
            babel: {
                presets: ['es2015', 'react', 'airbnb']
            }
        },
        module: {
            loaders: [
                {
                    test: /(\.jsx|\.js)$/,
                    exclude: /(node_modules)/,
                    loader: ['babel-loader'],
                    query: {
                        presets: ['es2015', 'react', 'airbnb']
                    }
                }
            ]
        }
    };

    if (config.coverage) {
        browsers = ['PhantomJS'];
        reporters = ['mocha', 'coverage'];
        preprocessors = ['webpack'];
        webpack.module.preLoaders = [
            {
                test: /(\.jsx|\.js)$/,
                exclude: [/(__tests__|node_modules)/],
                loader: 'isparta'
            }
        ];
    }

    config.set({
        browsers,
        reporters,
        webpack,
        frameworks: ['mocha', 'sinon'],
        files: [
            './src/**/__tests__/*-test.js'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-sinon',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-coverage',
            'karma-mocha-reporter'
        ],
        preprocessors: {
            './src/**/__tests__/*-test.js': preprocessors
        },
        coverageReporter: {
            type: 'html',
            dir: 'coverage'
        },
        webpackMiddleware: {
            noInfo: true //please don't spam the console when running in karma!
        },
        singleRun: config.coverage
    });
};
