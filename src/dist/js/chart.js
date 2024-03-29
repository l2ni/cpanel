            'use strict';

            window.chartColors = {
                red: 'rgb(255, 99, 132)',
                orange: 'rgb(255, 159, 64)',
                yellow: 'rgb(255, 205, 86)',
                green: 'rgb(75, 192, 192)',
                blue: 'rgb(54, 162, 235)',
                purple: 'rgb(153, 102, 255)',
                grey: 'rgb(201, 203, 207)'
            };

            (function(global) {
                var MONTHS = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                ];

                var COLORS = [
                    '#4dc9f6',
                    '#f67019',
                    '#f53794',
                    '#537bc4',
                    '#acc236',
                    '#166a8f',
                    '#00a950',
                    '#58595b',
                    '#8549ba'
                ];

                var Samples = global.Samples || (global.Samples = {});
                var Color = Chart.helpers.color;

                function applyDefaultNumbers(config) {
                    var cfg = config || {};
                    cfg.min = cfg.min || 0;
                    cfg.max = cfg.max || 1;
                    cfg.from = cfg.from || [];
                    cfg.count = cfg.count || 8;
                    cfg.decimals = cfg.decimals || 8;
                    cfg.continuity = cfg.continuity || 1;

                    return cfg;
                }

                Samples.utils = {
                    // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
                    srand: function(seed) {
                        this._seed = seed;
                    },

                    rand: function(min, max) {
                        var seed = this._seed;
                        min = min === undefined ? 0 : min;
                        max = max === undefined ? 1 : max;
                        this._seed = (seed * 9301 + 49297) % 233280;
                        return min + (this._seed / 233280) * (max - min);
                    },

                    numbers: function(config) {
                        var cfg = applyDefaultNumbers(config);
                        var dfactor = Math.pow(10, cfg.decimals) || 0;
                        var data = [];
                        var i, value;

                        for (i = 0; i < cfg.count; ++i) {
                            value = (cfg.from[i] || 0) + this.rand(cfg.min, cfg.max);
                            if (this.rand() <= cfg.continuity) {
                                data.push(Math.round(dfactor * value) / dfactor);
                            } else {
                                data.push(null);
                            }
                        }

                        return data;
                    },

                    labels: function(config) {
                        var cfg = config || {};
                        var min = cfg.min || 0;
                        var max = cfg.max || 100;
                        var count = cfg.count || 8;
                        var step = (max - min) / count;
                        var decimals = cfg.decimals || 8;
                        var dfactor = Math.pow(10, decimals) || 0;
                        var prefix = cfg.prefix || '';
                        var values = [];
                        var i;

                        for (i = min; i < max; i += step) {
                            values.push(prefix + Math.round(dfactor * i) / dfactor);
                        }

                        return values;
                    },

                    months: function(config) {
                        var cfg = config || {};
                        var count = cfg.count || 12;
                        var section = cfg.section;
                        var values = [];
                        var i, value;

                        for (i = 0; i < count; ++i) {
                            value = MONTHS[Math.ceil(i) % 12];
                            values.push(value.substring(0, section));
                        }

                        return values;
                    },

                    color: function(index) {
                        return COLORS[index % COLORS.length];
                    },

                    transparentize: function(color, opacity) {
                        var alpha = opacity === undefined ? 0.5 : 1 - opacity;
                        return Color(color).alpha(alpha).rgbString();
                    }
                };
                // DEPRECATED
                window.randomScalingFactor = function() {
                    return Math.round(Samples.utils.rand(-100, 100));
                };
                // INITIALIZATION
                Samples.utils.srand(Date.now());
            }(this));



            var presets = window.chartColors;
            var utils = Samples.utils;
            var inputs = {
                min: -100,
                max: 100,
                count: 8,
                decimals: 2,
                continuity: 1
            };

            function generateData(config) {
                return utils.numbers(Chart.helpers.merge(inputs, config || {}));
            }

            function generateLabels(config) {
                return utils.months(Chart.helpers.merge({
                    count: inputs.count,
                    section: 3
                }, config || {}));
            }

            var options = {
                maintainAspectRatio: false,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0
                        }
                    }
                }
            };

            [false, 'origin', 'start', 'end'].forEach(function(boundary, index) {

                // reset the random seed to generate the same data for all charts
                utils.srand(8);

                new Chart('chart-' + index, {
                    type: 'line',
                    data: {
                        labels: generateLabels(),
                        datasets: [{
                            backgroundColor: utils.transparentize(presets.red),
                            borderColor: presets.red,
                            data: generateData(),
                            label: 'Dataset',
                            fill: boundary
                        }]
                    },
                    options: Chart.helpers.merge(options, {
                        title: {
                            text: 'fill: ' + boundary,
                            display: true
                        }
                    })
                });
            });

            // eslint-disable-next-line no-unused-vars
            function toggleSmooth(btn) {
                var value = btn.classList.toggle('btn-on');
                Chart.helpers.each(Chart.instances, function(chart) {
                    chart.options.elements.line.tension = value ? 0.4 : 0.000001;
                    chart.update();
                });
            }

            // eslint-disable-next-line no-unused-vars
            function randomize() {
                var seed = utils.rand();
                Chart.helpers.each(Chart.instances, function(chart) {
                    utils.srand(seed);

                    chart.data.datasets.forEach(function(dataset) {
                        dataset.data = generateData();
                    });

                    chart.update();
                });
            }
