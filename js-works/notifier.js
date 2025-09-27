// Inject CSS styles for toasts
const toastStyles = `
<style>
/* Professional color scheme */
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

.toast {
  position: fixed;
  top: 80px;
  right: -400px;
  background: var(--card-bg);
  color: var(--text-primary);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1000;
  max-width: 280px;
  min-height: 60px;
  max-height: 120px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0;
  transform: translateX(100%) translateY(0);
  border: 1px solid var(--border-color);
}
.toast.show {
  right: 20px;
  opacity: 1;
  transform: translateX(0) translateY(0);
}

.toast.success {
  background: var(--card-bg);
  border-left: 4px solid var(--success-color);
}

.toast.error {
  background: var(--card-bg);
  border-left: 4px solid var(--danger-color);
}

.toast.warning {
  background: var(--card-bg);
  border-left: 4px solid var(--warning-color);
}

.toast.info {
  background: var(--card-bg);
  border-left: 4px solid var(--info-color);
}

.toast-icon {
  font-size: 1.1rem;
  min-width: 20px;
  animation: iconBounce 0.6s ease-out;
}

@keyframes iconBounce {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes pulse {
  0% { transform: translateY(-5px); }
  70% { transform: translateY(0); }
  100% { transform: translateY(0); }
}

.toast.success .toast-icon { color: var(--success-color); }
.toast.error .toast-icon { color: var(--danger-color); }
.toast.warning .toast-icon { color: var(--warning-color); }
.toast.info .toast-icon { color: var(--info-color); }

.toast-title {
  font-weight: bold;
  margin-bottom: 2px;
  font-size: 0.95rem;
  word-wrap: break-word;
  white-space: normal;
}

.toast-message {
  font-size: 0.9rem;
  font-weight: 600;
  word-wrap: break-word;
  white-space: normal;
}

.toast-content {
  flex: 1;
}

.toast-close {
  background: none;
  border: none;
  color: var(--text-secondary);
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

.toast-close:hover {
  color: var(--text-primary);
  transform: rotate(90deg);
}

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  transition: width 0.1s linear;
  border-radius: 0 0 8px 8px;
}

.toast.success .toast-progress { background: var(--success-color); }
.toast.error .toast-progress { background: var(--danger-color); }
.toast.warning .toast-progress { background: var(--warning-color); }
.toast.info .toast-progress { background: var(--info-color); }

/* Dark Mode Styles */
[data-theme="dark"] .toast {
  background: var(--card-bg);
  color: var(--text-primary);
  border-color: var(--border-color);
}

[data-theme="dark"] .toast.success {
  background: rgba(52, 211, 153, 0.1);
}

[data-theme="dark"] .toast.error {
  background: rgba(248, 113, 113, 0.1);
}

[data-theme="dark"] .toast.warning {
  background: rgba(251, 191, 36, 0.1);
}

[data-theme="dark"] .toast.info {
  background: rgba(56, 189, 248, 0.1);
}

[data-theme="dark"] .toast-close {
  color: var(--text-secondary);
}

[data-theme="dark"] .toast-close:hover {
  color: var(--text-primary);
}

@media (max-width: 480px) {
  .toast {
    left: 20px;
    right: 20px;
    max-width: none;
    top: 10px;
  }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', toastStyles);

// Toast functionality
let toastId = 0;
let activeToasts = [];
const maxToasts = 3;

function showToast(title, message, type = 'info') {
  if (activeToasts.length >= maxToasts) {
    removeToast(activeToasts.shift());
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.id = `toast-${++toastId}`;

  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  const icons = {
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  };
  icon.textContent = icons[type] || icons.info;

  const content = document.createElement('div');
  content.className = 'toast-content';

  const toastTitle = document.createElement('div');
  toastTitle.className = 'toast-title';
  toastTitle.textContent = title;

  const toastMessage = document.createElement('div');
  toastMessage.className = 'toast-message';
  toastMessage.textContent = message;

  content.appendChild(toastTitle);
  content.appendChild(toastMessage);

  const closeBtn = document.createElement('button');
  closeBtn.className = 'toast-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = () => removeToast(toast);

  const progress = document.createElement('div');
  progress.className = 'toast-progress';
  progress.style.width = '100%';

  toast.appendChild(icon);
  toast.appendChild(content);
  toast.appendChild(closeBtn);
  toast.appendChild(progress);

  activeToasts.push(toast);

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
    updateToastPositions();
  }, 50);

  // Type-specific animations
  if (type === 'error') {
    toast.style.animation = 'shake 0.5s ease-in-out';
  } else if (type === 'success') {
    toast.style.animation = 'pulse 0.6s ease-out';
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
  setTimeout(() => removeToast(toast), duration);
}

function removeToast(t) {
  const index = activeToasts.indexOf(t);
  if (index > -1) {
    activeToasts.splice(index, 1);
  }
  t.classList.remove('show');
  setTimeout(() => {
    if (document.body.contains(t)) {
      document.body.removeChild(t);
    }
    updateToastPositions();
  }, 400);
}

function updateToastPositions() {
  let currentTop = 80;
  const margin = 10;
  activeToasts.forEach((toast) => {
    toast.style.top = `${currentTop}px`;
    currentTop += toast.offsetHeight + margin;
  });
}

// Global notify function
window.notify = function(status, text) {
  const title = status.charAt(0).toUpperCase() + status.slice(1) + '!';
  showToast(title, text, status);
};
