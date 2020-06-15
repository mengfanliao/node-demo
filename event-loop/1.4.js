/**
 * 代码目的：验证setTimeout和setImmediate放在Timers阶段回调内，setImmediate先于setTimeout执行。
 * 验证方式：不断执行该文件，观察输出结果
 */

/**
 * 执行流程：类似于1.3，不再赘述
 * */

setTimeout(() => {
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
  
  setImmediate(() => {
    console.log('setImmediate');
  });
});
