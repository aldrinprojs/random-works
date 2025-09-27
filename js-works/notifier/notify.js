// Inject CSS styles for toasts
const notifyToastStyles = `
<style>
/* Professional color scheme */
:root {
  --notify-primary-color: #2563eb;
  --notify-secondary-color: #64748b;
  --notify-success-color: #059669;
  --notify-danger-color: #dc2626;
  --notify-warning-color: #d97706;
  --notify-info-color: #0891b2;
  --notify-light-bg: #ffffff;
  --notify-card-bg: #ffffff;
  --notify-text-primary: #1e293b;
  --notify-text-secondary: #64748b;
  --notify-border-color: #e2e8f0;
}

.notify-toast {
  position: fixed;
  top: 80px;
  right: -400px;
  background: var(--notify-card-bg);
  color: var(--notify-text-primary);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 999999;
  max-width: 280px;
  min-height: 60px;

  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0;
  transform: translateX(100%) translateY(0);
  border: 1px solid var(--notify-border-color);
}
.notify-toast.show {
  right: 20px;
  opacity: 1;
  transform: translateX(0) translateY(0);
}

.notify-toast.success {
  background: var(--notify-card-bg);
  border-left: 4px solid var(--notify-success-color);
}

.notify-toast.error {
  background: var(--notify-card-bg);
  border-left: 4px solid var(--notify-danger-color);
}

.notify-toast.warning {
  background: var(--notify-card-bg);
  border-left: 4px solid var(--notify-warning-color);
}

.notify-toast.info {
  background: var(--notify-card-bg);
  border-left: 4px solid var(--notify-info-color);
}

.notify-toast-icon {
  font-size: 1.1rem;
  min-width: 20px;
  animation: notifyIconBounce 0.6s ease-out;
}

@keyframes notifyIconBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes notifyShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes notifyPulse {
  0% { transform: translateY(-5px); }
  70% { transform: translateY(0); }
  100% { transform: translateY(0); }
}

.notify-toast.success .notify-toast-icon { color: var(--notify-success-color); }
.notify-toast.error .notify-toast-icon { color: var(--notify-danger-color); }
.notify-toast.warning .notify-toast-icon { color: var(--notify-warning-color); }
.notify-toast.info .notify-toast-icon { color: var(--notify-info-color); }

.notify-toast-title {
  font-weight: bold;
  margin-bottom: 2px;
  font-size: 0.95rem;
  word-wrap: break-word;
  white-space: normal;
}

.notify-toast-message {
  font-size: 0.9rem;
  font-weight: 600;
  word-wrap: break-word;
  white-space: normal;
}

.notify-toast-content {
  flex: 1;
}

.notify-toast-close {
  background: none;
  border: none;
  color: var(--notify-text-secondary);
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.notify-toast-close:hover {
  color: var(--notify-text-primary);
  transform: rotate(90deg);
}

.notify-toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  transition: width 0.1s linear;
  border-radius: 0 0 8px 8px;
}

.notify-toast.success .notify-toast-progress { background: var(--notify-success-color); }
.notify-toast.error .notify-toast-progress { background: var(--notify-danger-color); }
.notify-toast.warning .notify-toast-progress { background: var(--notify-warning-color); }
.notify-toast.info .notify-toast-progress { background: var(--notify-info-color); }

/* Dark Mode Styles */
[data-theme="dark"] {
  --notify-card-bg: #1e293b;
  --notify-text-primary: #f1f5f9;
  --notify-text-secondary: #cbd5e1;
  --notify-border-color: #334155;
}

[data-theme="dark"] .notify-toast {
  background: var(--notify-card-bg);
  color: var(--notify-text-primary);
  border-color: var(--notify-border-color);
}

[data-theme="dark"] .notify-toast.success {
  background: var(--notify-card-bg);
  border-left-color: var(--notify-success-color);
}

[data-theme="dark"] .notify-toast.error {
  background: var(--notify-card-bg);
  border-left-color: var(--notify-danger-color);
}

[data-theme="dark"] .notify-toast.warning {
  background: var(--notify-card-bg);
  border-left-color: var(--notify-warning-color);
}

[data-theme="dark"] .notify-toast.info {
  background: var(--notify-card-bg);
  border-left-color: var(--notify-info-color);
}

[data-theme="dark"] .notify-toast-close {
  color: var(--notify-text-secondary);
}

[data-theme="dark"] .notify-toast-close:hover {
  color: var(--notify-text-primary);
}

@media (max-width: 480px) {
  .notify-toast {
    left: 20px;
    right: 20px;
    max-width: none;
    top: 10px;
  }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notifyToastStyles);

// Toast functionality
let notifyToastId = 0;
let notifyActiveToasts = [];
const notifyMaxToasts = 3;

function notifyShowToast(title, message, type = 'info') {
  if (notifyActiveToasts.length >= notifyMaxToasts) {
    notifyRemoveToast(notifyActiveToasts.shift());
  }

  const toast = document.createElement('div');
  toast.className = `notify-toast ${type}`;
  toast.id = `notify-toast-${++notifyToastId}`;

  const icon = document.createElement('span');
  icon.className = 'notify-toast-icon';
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  icon.textContent = icons[type] || icons.info;

  const content = document.createElement('div');
  content.className = 'notify-toast-content';

  const toastTitle = document.createElement('div');
  toastTitle.className = 'notify-toast-title';
  toastTitle.textContent = title;

  const toastMessage = document.createElement('div');
  toastMessage.className = 'notify-toast-message';
  toastMessage.textContent = message;

  content.appendChild(toastTitle);
  content.appendChild(toastMessage);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'notify-toast-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => notifyRemoveToast(toast);

  const progress = document.createElement('div');
  progress.className = 'notify-toast-progress';
  progress.style.width = '100%';

  toast.appendChild(icon);
  toast.appendChild(content);
  toast.appendChild(closeBtn);
  toast.appendChild(progress);

  notifyActiveToasts.push(toast);

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
    notifyUpdateToastPositions();
  }, 50);

  // Type-specific animations
  if (type === 'error') {
    toast.style.animation = 'notifyShake 0.5s ease-in-out';
  } else if (type === 'success') {
    toast.style.animation = 'notifyPulse 0.6s ease-out';
  }

  // Progress bar animation
  const duration = 4000;
  const start = Date.now();
  function animateProgress() {
    const elapsed = Date.now() - start;
    const progressWidth = 100 - (elapsed / duration) * 100;
    progress.style.width = Math.max(0, progressWidth) + '%';
    if (elapsed < duration) requestAnimationFrame(animateProgress);
  }
  animateProgress();

  // Auto remove
  setTimeout(() => notifyRemoveToast(toast), duration);
}

function notifyRemoveToast(t) {
  const index = notifyActiveToasts.indexOf(t);
  if (index > -1) {
    notifyActiveToasts.splice(index, 1);
  }
  t.classList.remove('show');
  setTimeout(() => {
    if (document.body.contains(t)) {
      document.body.removeChild(t);
    }
    notifyUpdateToastPositions();
  }, 400);
}

function notifyUpdateToastPositions() {
  let currentTop = 80;
  const margin = 10;
  notifyActiveToasts.forEach((toast) => {
    toast.style.top = `${currentTop}px`;
    currentTop += toast.offsetHeight + margin;
  });
}

// Global notify function
window.notify = function(status, text) {
  const title = status.charAt(0).toUpperCase() + status.slice(1) + '!';
  notifyShowToast(title, text, status);
};
