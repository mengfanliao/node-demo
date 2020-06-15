/**
 * 代码目的：验证nextTick和Promise回调是在阶段之间执行的，并且nextTick的执行是早于Promise回调的。
 * 验证方式：不断执行该文件，观察输出结果
 */

/**
 * 执行流程：
 * 1. 执行主模块，判断是否存在1.1.js文件，并将回调加入到Poll阶段的FIFO队列中。
 * ...中间操作省略
 * 2. 执行event loop，进入Poll阶段，如果有I/O事件，那么该回调执行，没有则继续执行event loop，执行到下一个event loop的Poll阶段，重复步骤2判断
 * ...中间操作省略
 * 3. 将setTimeout的回调加入到Timers阶段中，将setImmediate的回调加入到check阶段中，将nextTick回调放到一个队列中，将Promise回调放到另外一个队列中
 * 4. 阶段执行结束，先执行完毕nextTick回调，然后再执行Promise回调。
 * 5. 执行event loop，进入Check阶段，执行setImmediate回调。
 * ...中间操作省略
 * 6. 执行下一个event loop，进入Timers阶段，判断是否包含可执行的回调，如果时间过去了1ms，那么就执行，否则则不执行，这两种情况都存在。如果没执行，重复步骤5.
 */

const fs = require('fs');
fs.exists('./1.1.js', () => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  setImmediate(() => {
    console.log('setImmediate');
  });

  Promise.resolve().then(() => {
    console.log('Promise1');
  });

  process.nextTick(() => {
    console.log('nextTick');
  });

  Promise.reject().then(() => {
    console.log('Promise2');
  });

  process.nextTick(() => {
    console.log('nextTick2');
  });
});



