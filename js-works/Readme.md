# Notify.js

A lightweight, customizable JavaScript library for displaying beautiful toast notifications on web pages. Perfect for providing user feedback, alerts, and status updates without disrupting the user experience.

## Features

- 🎨 **Multiple Notification Types**: Success, Error, Warning, and Info notifications
- 🎭 **Smooth Animations**: Type-specific animations (shake for errors, pulse for success)
- ⏱️ **Auto-Dismiss**: Notifications automatically disappear after 4 seconds
- 📊 **Progress Bar**: Visual countdown indicator for each notification
- 🌙 **Dark Mode Support**: Automatically adapts to your site's theme
- 📱 **Responsive Design**: Optimized for mobile and desktop
- 🎯 **Easy to Use**: Simple `notify(status, text)` function
- 🔄 **Queue Management**: Handles multiple notifications with stacking
- ❌ **Manual Close**: Users can dismiss notifications early

## Quick Start

### 1. Include the Script

Add the `notify.js` file to your project and include it in your HTML:

```html
<script src="path/to/notify.js"></script>
```

### 2. Use the notify() Function

Call the global `notify()` function anywhere in your JavaScript:

```javascript
// Success notification
notify('success', 'Operation completed successfully!');

// Error notification
notify('error', 'Something went wrong. Please try again.');

// Warning notification
notify('warning', 'This action cannot be undone.');

// Info notification
notify('info', 'Here is some additional information.');
```

## API Reference

### notify(status, text)

Displays a toast notification.

#### Parameters

- `status` (string): The type of notification. Supported values:
  - `'success'` - Green notification with checkmark
  - `'error'` - Red notification with X mark
  - `'warning'` - Orange notification with warning symbol
  - `'info'` - Blue notification with info symbol
- `text` (string): The message to display in the notification

#### Example

```javascript
// Basic usage
notify('success', 'Data saved successfully!');

// In event handlers
document.getElementById('saveBtn').addEventListener('click', function() {
  // Save data logic...
  notify('success', 'Your changes have been saved.');
});

// In async operations
async function submitForm() {
  try {
    const response = await fetch('/api/submit', { /* ... */ });
    if (response.ok) {
      notify('success', 'Form submitted successfully!');
    } else {
      notify('error', 'Failed to submit form. Please try again.');
    }
  } catch (error) {
    notify('error', 'Network error. Please check your connection.');
  }
}
```

## Styling & Customization

The library includes comprehensive CSS with CSS custom properties for easy theming. The styles are automatically injected into the document head.

### CSS Variables

You can customize the appearance by overriding these CSS variables in your stylesheet:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --success-color: #059669;
  --danger-color: #dc2626;
  --warning-color: #d97706;
  --info-color: #0891b2;
  --light-bg: #ffffff;
  --card-bg: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
}
```

### Dark Mode

The library automatically detects and supports dark mode when `[data-theme="dark"]` is set on the HTML element:

```javascript
// Enable dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Disable dark mode
document.documentElement.removeAttribute('data-theme');
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Examples
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes only. Please refer to the Terms of Service page for usage guidelines.

## 👥 Authors

- **Your Name** - *Initial work* - [Your GitHub](https://github.com/your-username)

## 🙏 Acknowledgments

- Firebase for backend services
- Bootstrap for UI components
- Font Awesome for icons
- Netlify for hosting
- All contributors and educators

## 📞 Support

If you encounter any issues or have questions, please check the TODO.md file for known issues or create an issue in the repository.

---

**Note**: This project was developed as part of a school assignment to demonstrate web development skills, Firebase integration, and modern attendance tracking solutions.
