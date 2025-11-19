export const useCounterAnimation = () => {
  const animateCounter = (
    element: HTMLElement,
    targetValue: number,
    duration: number = 1500,
    suffix: string = ""
  ) => {
    const startValue = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(
        startValue + (targetValue - startValue) * easeOutQuart
      );

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = targetValue + suffix;
      }
    };

    requestAnimationFrame(animate);
  };

  return {
    animateCounter,
  };
};
