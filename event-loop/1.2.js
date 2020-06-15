/**
 * 代码目的：在1.1的基础上，进行改动，在执行主模块的后面加上超过2ms的延时，验证setTimeout肯定会先于setImmediate执行。
 * 验证方式：不断执行该文件，观察输出结果
 */

/**
 * 执行流程：
 * 1. 执行主模块，将setTimeout和setTimmediate分别加入Timers阶段、Check阶段的队列，并执行while语句至少2ms。
 * ...中间操作省略
 * 2. 执行event loop，进入Timers阶段，判断是否包含可执行的回调，由于时间过去了至少2ms，setTimeout的回调被执行
 * ...中间操作省略
 * 3. 执行event loop，进入check阶段，执行setImmediate回调。
 * ...中间操作省略
 * 4. 判断是否还有没有执行的回调（event loop是否有效），由于回调全部执行完毕，所以程序运行终止，正常退出。
 */

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

const time = Date.now();

while(Date.now() - time < 2) {

}



