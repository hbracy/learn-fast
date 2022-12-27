// Only use this function during the initial install phase. After
// installation the user may have intentionally unassigned commands.
function checkCommandShortcuts() {
  chrome.commands.getAll((commands) => {
    const missingShortcuts = [];

    for (const { name, shortcut } of commands) {
      if (shortcut === '') {
        missingShortcuts.push(name);
      }
    }

    if (missingShortcuts.length > 0) {
      // Update the extension UI to inform the user that one or more
      // commands are currently unassigned.
    }
  });
}

chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
    checkCommandShortcuts();
  }
  chrome.action.setBadgeText({
    text: 'OFF',
  });
});

// When the user clicks on the extension action
chrome.commands.onCommand.addListener(async (command, tab) => {
  console.log('PRESSED');
  // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';
  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });
  chrome.tabs.sendMessage(tab.id, nextState);
  // chrome.tabs.executeScript(null, { file: 'scripts/content.js' });
});
