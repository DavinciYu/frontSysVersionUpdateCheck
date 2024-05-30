[*Example of usage*](https://tinyurl.com/2mknex43):
```js
import { initSystemVersionCheck, cancelVersionCheck } form 'front-version-update-check';

initSystemVersionCheck(
  {
    filePath: "/index.html", // 需要拉取检测的服务器文件
    intervalTime: 15000 // 拉取的间隔，默认30s
  },
  () => {
    MessageBox.confirm("检测到系统有新版本，是否刷新页面?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        location.reload();
      })
      .catch(() => {
        cancelVersionCheck(); // 取消拉去检测
      });
  }
);
```
