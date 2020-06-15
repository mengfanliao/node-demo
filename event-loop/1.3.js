/**
 * 代码目的：验证setTimeout和setImmediate放在i/o回调内，setImmediate先于setTimeout执行。
 * 验证方式：不断执行该文件，观察输出结果
 */

/**
 * 执行流程：
 * 1. 执行主模块，判断是否存在1.1.js文件，并将回调加入到Poll阶段的FIFO队列中。
 * ...中间操作省略
 * 2. 执行event loop，进入Poll阶段，如果有I/O事件，那么该回调执行，没有则继续执行event loop，执行到下一个event loop的Poll阶段，重复步骤2判断
 * ...中间操作省略
 * 3. 将setTimeout的回调加入到Timers阶段中，将setImmediate的回调加入到check阶段中
 * 4. 执行event loop，进入Check阶段，执行setImmediate回调。
 * ...中间操作省略
 * 5. 执行下一个event loop，进入Timers阶段，判断是否包含可执行的回调，如果时间过去了1ms，那么就执行，否则则不执行，这两种情况都存在。如果没执行，重复步骤5.
 */

const fs = require('fs');
fs.exists('./1.1.js', () => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  setImmediate(() => {
    console.log('setImmediate');
  });
});



