export function setupTimeout(callback, duration) {
  let timeOutId;

  const startTimeout = () => {
    timeOutId = setTimeout(callback, duration);
  };

  const pauseTimeout = () => {
    window.clearTimeout(timeOutId);
  };

  const resumeTimeout = () => {
    const d = new Date();
    const remaining = -(d.getMilliseconds() - duration);
    timeOutId = setTimeout(callback, remaining);
  };

  startTimeout();

  return { pauseTimeout, resumeTimeout };
}
