# X Badge Blocker 🚫

A simple but extremely persistent Google Chrome extension to completely hide annoying affiliate, casino, or sponsor badges on X (formerly Twitter).

## Features
* **Image ID Blocker:** Accurately filters out badges based on their hidden Twitter image ID.
* **Account Blocker:** Blocks mentions and profile links of unwanted accounts.
* **"Indestructible":** Survives X's dynamic page loads (SPA) through continuous background CSS injection.

## Installation
Since this extension is not yet available in the Chrome Web Store, you can manually install it in just a few seconds:

1. Download this repository (as a ZIP file) or clone it via Git.
2. Open Google Chrome and type `chrome://extensions/` in the address bar.
3. Enable **Developer mode** in the top right corner.
4. Click on **Load unpacked** in the top left corner.
5. Select the folder where these files are located. Done!

## Usage
1. Pin the extension to your Chrome toolbar (using the puzzle piece icon) for quick access to the popup.
2. When you spot an annoying badge on X: **Right-click exactly on the badge** and select **"Copy image address"**.
3. Open the X Badge Blocker popup and paste the entire link into the text field.
4. Click **Add**. The extension will automatically extract the hidden ID, and the badge will disappear from your screen forever!
5. Alternatively, if you want to also block content, you can simply enter account names (e.g., `skinscom` or `@skinscom`) to hide links to that specific account.
