/**
 * 代码目的：验证在阶段的若干个回调执行过程中，调用了nextTick、promise.resolve，并不会在阶段中执行nextTick、promise回调，而是等到了阶段结束后才执行
 * 验证方式：不断执行该文件，观察输出结果
 */

/**
 * 输出结果
  setImmediate
  setImmediate2
  setImmediate3
  setImmediate4
  nextTick1
  nextTick2
  Promise1
  Promise2
 */


const fs = require('fs');

fs.exists('./1.1.js', () => {
  setImmediate(() => {
    console.log('setImmediate');
  });

  setImmediate(() => {
    console.log('setImmediate2');
    process.nextTick(() => {
      console.log('nextTick1');
    });
    Promise.resolve().then(() => {
      console.log('Promise1');
    });
  });

  setImmediate(() => {
    console.log('setImmediate3');
    process.nextTick(() => {
      console.log('nextTick2');
    });
    Promise.resolve().then(() => {
      console.log('Promise2');
    });
  });

  setImmediate(() => {
    console.log('setImmediate4');
  });

});

