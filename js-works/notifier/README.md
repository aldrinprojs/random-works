# Notify.js

A simple, free JavaScript library for toast notifications. Use it to show quick user feedback like success messages, errors, warnings, or info alerts. No dependencies, works on any modern browser, and supports dark mode.

## What It Does

- Displays beautiful, animated toasts that auto-dismiss after 4 seconds
- Supports 4 types: success (green), error (red), warning (orange), info (blue)
- Includes progress bar, close button, and stacking for multiple notifications
- Responsive and theme-aware

## How to Use

1. **Include the Script**
   Add `notify.js` to your HTML:
   ```html
   <script src="notify.js"></script>
   ```

2. **Show a Notification**
   Call the global `notify()` function:
   ```javascript
   // Success
   notify('success', 'Saved successfully!');

   // Error
   notify('error', 'Something went wrong.');

   // Warning
   notify('warning', 'Are you sure?');

   // Info
   notify('info', 'Check this out.');
   ```

## Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test</title>
</head>
<body>
  <button onclick="notify('success', 'Button clicked!')">Click Me</button>
  <script src="notify.js"></script>
</body>
</html>
```

## Customization

The library injects its own CSS. Override colors with CSS variables like `--success-color: #your-color;`.

## License

MIT License - Free to use, modify, and distribute. No attribution required.
