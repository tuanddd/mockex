// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

console.log(
  "This prints to the console of the page (injected only if the page url matched)"
);

chrome.runtime.onMessage.addListener((req, _, respond) => {
  if (req.type === "clipboard") {
    navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": new Blob([req.msg], { type: "text/plain" }),
      }),
    ]);
  }
  respond();
});
