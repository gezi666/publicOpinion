/**
 * 字符云图
 *
 * 用例：
 * var container = document.getElementById('container');
 * var option = {
 *     startColor: '#ffffff',   // 起始颜色(权重小的节点颜色)
 *     endColor: '#000000',     // 结束颜色(权重大的节点颜色)
 *     // colors:[""]           // 节点颜色数组，根据权重大小分配
 *     clickHandle：function(ev){        // 节点点击事件
 *         console.log(ev);
 *     }
 * }
 * var data=[{
 *     name:'test1',
 *     size:'10'
 * }]
 * var bc = new BubbleCloudChart(container, option);
 * bc.init();
 * bc.setData(data);
 */
(function(window) {
    if (typeof d3 === "undefined") throw new Error("Please include D3.js Library first.");
    /**
     * 泡沫云图.
     */
    var defaultOpt = {
            startColor: '',
            endColor: '',
            colorStep: 100,
        },
        padding = {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
        };
    /**
     * 获取节点权重
     * @param  {Node} d [description]
     * @return {Number}   [description]
     */
    function weightFunction(d) {
        return d.size;
    };

    function labelFunction(d) {
        return d.name;
    };

    function weightFunction(d) {
        return d.size;
    };

    function colorFunction(d) {
        return d.color;
    };

    /**
     * 泡沫云图.
     * @param { DocumentElement } el     容器
     * @param { Object } option  配置参数
     */
    function BubbleCloudChart(el, option) {
        option = $.extend({}, defaultOpt, option);
        option.width = option.width || el.offsetWidth;
        option.height = option.height || el.offsetHeight;
        var me = this;

        me.domElement = el;
        me.width = option.width;
        me.height = option.height;
        me.colors = option.colors || new gradientColor(option.startColor, option.endColor, option.colorStep);
        me.clickHandler = option.clickHandler;
        me._force = d3.layout.force()
            .gravity(0)
            .charge(0)
            .on("tick", function(d) {
                me._force_tickHandler.bind(me)(d);
            })
            .on("end", function(d) {
                me._tickEnd = true;
                me._bubbles.attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")"
                });
            });
        me._option = option;
    }

    BubbleCloudChart.prototype = {
        constructor: BubbleCloudChart,
        /**
         * 绘制容器
         * @type {Element}
         */
        domElement: null,
        /**
         * 泡沫的最小半径.
         * @type {number}
         */
        minRadius: 5,
        /**
         * 泡沫的最大半径.
         * @type {number}
         */
        maxRadius: 40,
        /**
         * 名称的最小半径.
         * @type {number}
         */
        minFontSize: 5,
        /**
         * 名称的最大半径.
         * @type {number}
         */
        maxFontSize: 20,
        /**
         * 节点颜色
         * @type {Array}
         */
        colors: [],
        /**
         * 自定义泡沫名称获取方法,可指定每个泡沫的名称.
         * @type {function}
         */
        labelFunction: function(d) {
            return d.name;
        },
        /**
         * 自定义泡沫权重获取方法,可指定每个泡沫的权重,将依据权重比率自动设置泡沫尺寸.
         * @type {function}
         */
        weightFunction: function(d) {
            return d.size;
        },
        /**
         * 自定义泡沫颜色获取方法,可指定每个泡沫的颜色.
         * @type {function}
         */
        colorFunction: function(d) {

        },
        /**
         * 点击事件监听.
         * @type {function}
         */
        clickHandler: null,
        /**
         * 自定义绘制方法,若未设置则使用默认方法.
         * @type {function}
         */
        customDrawFunction: function(g, d, radius, color) {
            g.append("circle")
                .attr("r", radius)
                .style("fill", color)
                .style("opacity", "1");
        },
        /**
         * 泡沫间扩散距离的填充,可影响泡沫云图的疏密度.
         * @type {number}
         */
        collisionPadding: 5,
        /**
         * 泡沫间的最小扩散距离,可影响泡沫云图的疏密度.
         * @type {number}
         */
        minCollisionRadius: 2,
        iconPadding: 150,
        _jitter: 0.618,
        _force: null,
        _svg: null,
        _ballGroup: null,
        _bubbles: null,
        _legend: null,
        _radiusScale: null,
        _fontSizeScale: null,
        _colorIndexScale: null,
        _width: 0,
        _height: 0,
        _tickEnd: false,
        _data: null,

        init: function() {
            var me = this;
            me._width = me.width - padding.right - padding.left;
            me._height = me.height - padding.top - padding.bottom;

            me._radiusScale = d3.scale.linear().range([me.minRadius, me.maxRadius]);
            me._fontSizeScale = d3.scale.linear().range([me.minFontSize, me.maxFontSize]);
            me._colorIndexScale = d3.scale.linear().range([0, me.colors.length - 1]);
            me._force.size([me._width, me._height]);

            d3.select(me.domElement).selectAll('svg').remove();

            me._svg = d3.select(me.domElement)
                .append("svg")
                .attr("width", me.width)
                .attr("height", me.height);
        },
        setData: function(value) {
            var me = this;
            if (arguments.length < 1) return me._data;
            me.data = value;
            me._data = $.extend(true, [], value);

            var labelFunction = me.labelFunction || labelFunction;
            var weightFunction = me.weightFunction || weightFunction;

            me._radiusScale.domain([
                d3.min(me._data, weightFunction),
                d3.max(me._data, weightFunction)
            ]);

            me._fontSizeScale.domain([
                d3.min(me._data, weightFunction),
                d3.max(me._data, weightFunction)
            ]);
            me._colorIndexScale.domain([
                d3.min(me._data, weightFunction),
                d3.max(me._data, weightFunction)
            ]);
            me._svg.selectAll(".node").remove();

            me._ballGroup = me._svg.append("g")
                .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
                .attr("class", "node");

            me._bubbles = me._ballGroup.selectAll("g")
                .data(me._data)
                .enter()
                .append("g")
                .style("cursor", "pointer")
                .on("click", function(d) {
                    if (me.clickHandler instanceof Function) me.clickHandler.call(null, d);
                });

            me._bubbles.each(function(d) {
                var weight = weightFunction(d);
                var radius = me._radiusScale(weight);
                var colorIndex = Math.round(me._colorIndexScale(weight));
                var color = me.colors[colorIndex];
                return me.customDrawFunction(d3.select(this), d, radius, color);
            });

            me._bubbles.append("text")
                .attr({
                    "text-anchor": "middle",
                    dy: ".3em"
                })
                .attr("font-size", function(d) {
                    return me._fontSizeScale(weightFunction(d));
                })
                .attr("fill", "#FFFFFF")
                .attr("font-family", "微软雅黑")
                .text(labelFunction);

            this._data.forEach(function(d, i) {
                d.fr = Math.max(me.minCollisionRadius, me._radiusScale(weightFunction(d)));
            });

            me._tickEnd = false;
            me._force.nodes(this._data).start();

            while (!me._tickEnd) {
                me._force.tick();
            }
        },

        resize: function() {
            var me = this;
            me.width = me.domElement.offsetWidth;
            me.height = me.domElement.offsetHeight;
            me.init();
            me.setData(me.data);
        },
        _force_tickHandler: function(e) {
            this._bubbles.each(this._gravity(e.alpha * 0.1))
                .each(this._collide(this._jitter));
        },

        _gravity: function(a) {
            var cx = this._width / 2;
            var cy = this._height / 2;
            var ax = a / 3;
            var ay = a;

            return function(d) {
                d.x += (cx - d.x) * ax;
                d.y += (cy - d.y) * ay;
            }
        },

        _collide: function(j) {
            var data = this._data;
            var collisionPadding = this.collisionPadding;
            return function(d) {
                data.forEach(function(d2) {
                    if (d !== d2) {
                        var x = d.x - d2.x;
                        var y = d.y - d2.y;
                        var dis = Math.sqrt(x * x + y * y);
                        var minDis = d.fr + d2.fr + collisionPadding;
                        if (dis < minDis) {
                            dis = (dis - minDis) / dis * j;
                            var mx = x * dis;
                            var my = y * dis;
                            d.x -= mx;
                            d.y -= my;
                            d2.x += mx;
                            d2.y += my;
                        }
                    }
                });
            }
        }
    }

    function gradientColor(startColor, endColor, step) {
        startRGB = this.colorRgb(startColor); //转换为rgb数组模式
        startR = startRGB[0];
        startG = startRGB[1];
        startB = startRGB[2];

        endRGB = this.colorRgb(endColor);
        endR = endRGB[0];
        endG = endRGB[1];
        endB = endRGB[2];

        sR = (endR - startR) / step; //总差值
        sG = (endG - startG) / step;
        sB = (endB - startB) / step;

        var colorArr = [];
        for (var i = 0; i < step; i++) {
            //计算每一步的hex值
            var hex = this.colorHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
            colorArr.push(hex);
        }
        return colorArr;
    }

    // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
    gradientColor.prototype.colorRgb = function(sColor) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sColor.toLowerCase();
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = "#";
                for (var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for (var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    };

    // 将rgb表示方式转换为hex表示方式
    gradientColor.prototype.colorHex = function(rgb) {
        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if (/^(rgb|RGB)/.test(_this)) {
            var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for (var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
                if (hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if (strHex.length !== 7) {
                strHex = _this;
            }
            return strHex;
        } else if (reg.test(_this)) {
            var aNum = _this.replace(/#/, "").split("");
            if (aNum.length === 6) {
                return _this;
            } else if (aNum.length === 3) {
                var numHex = "#";
                for (var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return _this;
        }
    }

    if (window) window.BubbleCloudChart = BubbleCloudChart;
})(window);