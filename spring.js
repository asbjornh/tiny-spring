export default function Spring(
  initialPosition = 0,
  { stiffness = 200, damping = 10, precision = 0.1 } = {}
) {
  let position = initialPosition;
  let endPosition = 0;
  let secPerFrame = 1 / 60;
  let velocity = 0;
  let onUpdate = () => {};
  let raf;

  const interpolate = () => {
    const springForce = stiffness * (endPosition - position);
    const dampingForce = damping * velocity;
    const acceleration = springForce - dampingForce;

    const newVelocity = velocity + acceleration * secPerFrame;
    const newPosition = position + newVelocity * secPerFrame;

    const isComplete =
      Math.abs(newVelocity) < precision &&
      Math.abs(newPosition - endPosition) < precision;

    position = isComplete ? endPosition : newPosition;
    velocity = newVelocity;
    onUpdate(position);

    if (!isComplete) raf = requestAnimationFrame(interpolate);
  };

  return {
    setValue: (v = 0) => {
      cancelAnimationFrame(raf);
      position = endPosition = v;
      onUpdate(position);
    },
    transitionTo: (v = 0) => {
      cancelAnimationFrame(raf);
      endPosition = v;
      interpolate();
    },
    onUpdate: (fn = () => {}) => {
      onUpdate = fn;
      fn(position);
    },
    destroy: () => {
      cancelAnimationFrame(raf);
      onUpdate = () => {};
    }
  };
}
