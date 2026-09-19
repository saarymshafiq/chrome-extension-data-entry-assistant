chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "copy-dob") return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: extractAndCopyDOB
  });
});

function extractAndCopyDOB() {
  try {
    const items = document.querySelectorAll("span.item");
    const dobItem = Array.from(items).find(el => el.innerText.startsWith("DOB"));

    if (!dobItem) throw new Error("DOB element not found.");

    const match = dobItem.innerText.match(/\b\d{2}\/\d{2}\/\d{4}\b/);
    if (!match) throw new Error("DOB not detected.");

    navigator.clipboard.writeText(match[0])
      .then(() => {
        console.log("DOB copied:", match[0]);
      })
      .catch(err => {
        console.error("Clipboard error:", err);
      });

  } catch (err) {
    alert(err.message);
  }
}