const defaultOptions = {
  filePath: "/index.html",
  intervalTime: 30000,
};
let htmlString = "";
let ifIntervalCheck = true;
export const initSystemVersionCheck = (options, callback) => {
  options = {
      ...defaultOptions,
      ...options,
  };
  getFileText(options, callback);
};
function getFileText(options, callback) {
  if (!ifIntervalCheck)
      return;
  if (typeof fetch !== "function")
      return;
  fetch(options.filePath, {
      headers: {
          "Content-Type": "text/html",
      },
      cache: "no-store",
  })
      .then((res) => {
      if (res.ok) {
          res.text().then((html) => {
              if (!htmlString) {
                  htmlString = html;
              }
              else {
                  if (htmlString !== html) {
                      if (typeof callback === "function") {
                          callback();
                      }
                      else {
                          if (window.confirm("检测到系统有新版本，是否刷新页面?")) {
                              location.reload();
                          }
                          else {
                              ifIntervalCheck = false;
                          }
                      }
                  }
              }
          });
      }
  })
      .finally(() => {
      setTimeout(() => {
          getFileText(options, callback);
      }, options.intervalTime);
  });
}
export function cancelVersionCheck() {
  ifIntervalCheck = false;
}
