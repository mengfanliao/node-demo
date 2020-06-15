/**
 * 代码目的：验证在执行promise和nextTick 的JS回调之后，总会先查看nextTick队列和promise队列有没有执行完毕，执行完毕后再进入下一个阶段。
 * 验证方式：不断执行该文件，观察输出结果
 */

/**
 * 输出结果：
      nextTick
      Promise1
      nextTick1
      Promise2
      nextTick2
      Promise3
      nextTick3
      Promise4
      setImmediate
 */


const fs = require('fs');

fs.exists('./1.1.js', () => {
  process.nextTick(() => {
    console.log('nextTick');
    Promise.resolve().then(() => {
      console.log('Promise1');
      process.nextTick(() => {
        console.log('nextTick1');
        Promise.resolve().then(() => {
          console.log('Promise2');
          process.nextTick(() => {
            console.log('nextTick2');
            Promise.resolve().then(() => {
              console.log('Promise3');
              process.nextTick(() => {
                console.log('nextTick3');
                Promise.resolve().then(() => {
                  console.log('Promise4');
                });
              });
            });
          });
        });
      });
    });
  });

  setImmediate(() => {
    console.log('setImmediate');
  });
});