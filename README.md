# Blogger HTML/JavaScript Gadget Editor Widener

A Tampermonkey userscript that makes the HTML/JavaScript gadget editing dialog larger in Blogger's Layout editor.

## Features

- Enlarges the HTML/JavaScript gadget dialog to 80% of viewport width and height
- Makes the code textarea much taller (50vh minimum) for comfortable editing
- Only affects HTML/JavaScript gadgets, not other gadget types (Blog Archives, Labels, etc.)
- Preserves button positioning and layout
- Works with Blogger's single-page application navigation

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click on the Tampermonkey icon and select "Create a new script"
3. Copy the contents of `blogger-htmljs-dialog-user-script.js`
4. Paste into the Tampermonkey editor, replacing the default template
5. Save (Ctrl+S or Cmd+S)

Alternatively, if you have Tampermonkey installed, you can click this link:
[Install Script](https://raw.githubusercontent.com/laslingerland/blogger-user-scripts/main/blogger-htmljs-widget-enlarger.js)

## Usage

1. Navigate to Blogger.com
2. Go to your blog's Layout page
3. Click on any HTML/JavaScript gadget to edit it
4. The dialog will automatically be enlarged

## Browser Compatibility

Works with any browser that supports Tampermonkey:
- Chrome/Chromium
- Firefox
- Edge
- Opera
- Safari (with Tampermonkey)

## License

This project is released into the public domain under the Unlicense.
See [LICENSE](LICENSE) for details.
