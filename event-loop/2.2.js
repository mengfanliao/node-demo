/**
 * 代码目的：验证在nextTick中调用nextTick，nextTick回调会被加入队列中，所以可能出现无限塞入nextTick的情况。Promise同理。
 * 验证方式：不断执行该文件，观察输出结果
 */


const fs = require('fs');

fs.exists('./1.1.js', () => {
  Promise.resolve().then(() => {
    console.log('Promise1');
  });

  process.nextTick(() => {
    console.log('nextTick');
    process.nextTick(() => {
      console.log('nextTick3');
    });
  });

  Promise.resolve().then(() => {
    console.log('Promise2');
    Promise.resolve().then(() => {
      console.log('Promise3');
    });
  });

  process.nextTick(() => {
    console.log('nextTick2');
  });

  setImmediate(() => {
    console.log('setImmediate');
  });
});