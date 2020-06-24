
const downloadBtn = document.getElementById("dc-btn") as HTMLButtonElement;
const platform = navigator.platform;

const platformName = {
  WINDOWS: "windows",
  MAC: "mac",
  LINUX: "linux"
};

function isWindows(): boolean {
  return platform.indexOf("Win") >= 0;
}

if (isWindows()) {
  downloadBtn.innerHTML += platformName.WINDOWS

  const winIcon = document.createElement("i");
  winIcon.style.marginLeft = "4px";
  winIcon.classList.add("fab", "fa-windows");
  downloadBtn.appendChild(winIcon);

} else {
  const notSupport = document.getElementById("not-support-user")!;
  notSupport.innerHTML = "未対応もしくは、対応不可能な端末です。"
  downloadBtn.disabled = true;
}

downloadBtn.addEventListener("click", (e) => {
  const link = document.createElement("a") as HTMLAnchorElement;
  link.download = "dracula-win32-x64.zip";
  link.href = "./resources/download/dracula-win32-x64.zip";
  link.click();
});