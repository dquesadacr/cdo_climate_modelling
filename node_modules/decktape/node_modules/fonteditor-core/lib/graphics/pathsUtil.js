"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _computeBoundingBox = require("./computeBoundingBox");

var _pathAdjust = _interopRequireDefault(require("./pathAdjust"));

var _pathRotate = _interopRequireDefault(require("./pathRotate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * @file 路径组变化函数
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * 翻转路径
 *
 * @param {Array} paths 路径数组
 * @param {number} xScale x翻转
 * @param {number} yScale y翻转
 * @return {Array} 变换后的路径
 */
function mirrorPaths(paths, xScale, yScale) {
  var _computePath$apply = _computeBoundingBox.computePath.apply(null, paths),
      x = _computePath$apply.x,
      y = _computePath$apply.y,
      width = _computePath$apply.width,
      height = _computePath$apply.height;

  if (xScale === -1) {
    paths.forEach(function (p) {
      (0, _pathAdjust["default"])(p, -1, 1, -x, 0);
      (0, _pathAdjust["default"])(p, 1, 1, x + width, 0);
      p.reverse();
    });
  }

  if (yScale === -1) {
    paths.forEach(function (p) {
      (0, _pathAdjust["default"])(p, 1, -1, 0, -y);
      (0, _pathAdjust["default"])(p, 1, 1, 0, y + height);
      p.reverse();
    });
  }

  return paths;
}

var _default = {
  /**
   * 旋转路径
   *
   * @param {Array} paths 路径数组
   * @param {number} angle 弧度
   * @return {Array} 变换后的路径
   */
  rotate: function rotate(paths, angle) {
    if (!angle) {
      return paths;
    }

    var bound = _computeBoundingBox.computePath.apply(null, paths);

    var cx = bound.x + bound.width / 2;
    var cy = bound.y + bound.height / 2;
    paths.forEach(function (p) {
      (0, _pathRotate["default"])(p, angle, cx, cy);
    });
    return paths;
  },

  /**
   * 路径组变换
   *
   * @param {Array} paths 路径数组
   * @param {number} x x 方向缩放
   * @param {number} y y 方向缩放
   * @return {Array} 变换后的路径
   */
  move: function move(paths, x, y) {
    var bound = _computeBoundingBox.computePath.apply(null, paths);

    paths.forEach(function (path) {
      (0, _pathAdjust["default"])(path, 1, 1, x - bound.x, y - bound.y);
    });
    return paths;
  },
  mirror: function mirror(paths) {
    return mirrorPaths(paths, -1, 1);
  },
  flip: function flip(paths) {
    return mirrorPaths(paths, 1, -1);
  }
};
exports["default"] = _default;