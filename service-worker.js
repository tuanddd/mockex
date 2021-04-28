// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log(
  "This prints to the console of the service worker (background script)"
);

// Importing and using functionality from external files is also possible.
importScripts("service-worker-utils.js");

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.

function generateSpongebobText(input) {
  var res = "";
  for (i = 0; i < input.length; i++) {
    res +=
      i % 2 == 0
        ? input.charAt(i).toLowerCase()
        : input.charAt(i).toUpperCase();
  }
  return res;
}

chrome.contextMenus.create(
  {
    contexts: ["selection"],
    id: "mock extension spongebob",
    title: "Mock it",
  },
  () => {}
);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  const mockedText = generateSpongebobText(info.selectionText);
  chrome.tabs.sendMessage(
    tab.id,
    {
      type: "clipboard",
      msg: mockedText,
    },
    () => {}
  );
});
