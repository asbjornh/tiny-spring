const msPerFrame = 1000 / 60;

export default class Spring {
  constructor(
    initialPosition = 0,
    { stiffness = 200, damping = 10, precision = 0.1 } = {}
  ) {
    this.callback = () => {};
    this.position = initialPosition;
    this.endPosition = 0;
    this.velocity = 0;
    this.secPerFrame = msPerFrame / 1000;
    this.stiffness = stiffness;
    this.damping = damping;
    this.precision = precision;
  }

  setValue(position = 0) {
    cancelAnimationFrame(this.raf);
    this.position = position;
    this.endPosition = position;
    this.callback(position);
  }

  transitionTo(position = 0) {
    cancelAnimationFrame(this.raf);
    this.endPosition = position;
    this.interpolate();
  }

  onUpdate(callback = () => {}) {
    this.callback = callback;
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    this.callback = () => {};
  }

  interpolate() {
    const { endPosition, position, velocity, secPerFrame } = this;
    const { stiffness, damping, precision } = this;

    const springForce = stiffness * (endPosition - position);
    const dampingForce = damping * velocity;
    const acceleration = springForce - dampingForce;

    const newVelocity = velocity + acceleration * secPerFrame;
    const newPosition = position + newVelocity * secPerFrame;

    if (
      Math.abs(newVelocity) < precision &&
      Math.abs(newPosition - endPosition) < precision
    ) {
      this.position = endPosition; // Stop interpolating
    } else {
      this.position = newPosition;
      this.raf = requestAnimationFrame(() => this.interpolate()); // Interpolate more
    }

    this.velocity = newVelocity;
    this.callback(this.position);
  }
}
