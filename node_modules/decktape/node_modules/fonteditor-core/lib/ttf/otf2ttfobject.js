"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = otf2ttfobject;

var _error = _interopRequireDefault(require("./error"));

var _otfreader = _interopRequireDefault(require("./otfreader"));

var _otfContours2ttfContours = _interopRequireDefault(require("./util/otfContours2ttfContours"));

var _computeBoundingBox = require("../graphics/computeBoundingBox");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file otf格式转ttf格式对象
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * otf格式转ttf格式对象
 *
 * @param  {ArrayBuffer|otfObject} otfBuffer 原始数据或者解析后的otf数据
 * @param  {Object} options   参数
 * @return {Object}          ttfObject对象
 */
function otf2ttfobject(otfBuffer, options) {
  var otfObject;

  if (otfBuffer instanceof ArrayBuffer) {
    var otfReader = new _otfreader["default"](options);
    otfObject = otfReader.read(otfBuffer);
    otfReader.dispose();
  } else if (otfBuffer.head && otfBuffer.glyf && otfBuffer.cmap) {
    otfObject = otfBuffer;
  } else {
    _error["default"].raise(10111);
  } // 转换otf轮廓


  otfObject.glyf.forEach(function (g) {
    g.contours = (0, _otfContours2ttfContours["default"])(g.contours);

    var box = _computeBoundingBox.computePathBox.apply(null, g.contours);

    if (box) {
      g.xMin = box.x;
      g.xMax = box.x + box.width;
      g.yMin = box.y;
      g.yMax = box.y + box.height;
      g.leftSideBearing = g.xMin;
    } else {
      g.xMin = 0;
      g.xMax = 0;
      g.yMin = 0;
      g.yMax = 0;
      g.leftSideBearing = 0;
    }
  });
  otfObject.version = 0x1; // 修改maxp相关配置

  otfObject.maxp.version = 1.0;
  otfObject.maxp.maxZones = otfObject.maxp.maxTwilightPoints ? 2 : 1;
  delete otfObject.CFF;
  delete otfObject.VORG;
  return otfObject;
}