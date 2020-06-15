/**
 * 代码目的：验证setTimeout和setImmediate放在主模块内，执行先后是不确定的。
 * 验证方式：不断执行该文件，观察输出结果
 */

 /**
 * 知识点：当setTimeout设置的delay时间大于2147483647或者小于1时，那么delay时间会被设置为1
 */

/**
 * 执行流程：
 * 1. 执行主模块，将setTimeout和setTimmediate分别加入Timers阶段、Check阶段的队列
 * ...中间操作省略
 * 2. 执行event loop，进入Timers阶段，判断是否包含可执行的回调，如果时间过去了1ms，那么就执行，否则则不执行，这两种情况都存在
 * ...中间操作省略
 * 3. 执行event loop，进入check阶段，执行setImmediate回调。
 * ...中间操作省略
 * 4. 判断是否还有没有执行的回调（event loop是否有效），如果上面setTimeout的回调执行了，那么程序运行就终止了，否则执行下一个event loop
 * ...中间操作省略
 * 5. 执行下一个event loop，进入Timers阶段，判断同上
 * ...中间操作省略
 * 6. 判断是否还有没有执行的回调（event loop是否有效），如果上面setTimeout的回调执行了，那么程序运行就终止了，否则执行下一个event loop
 * 7. 重复5，6步骤，直到结束。
 */

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});



