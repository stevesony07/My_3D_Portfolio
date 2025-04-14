// Empty module for GSAP plugins during build
export const ScrollTrigger = {
  getById: () => null,
  getAll: () => [],
  refresh: () => {},
  config: () => {},
  create: () => ({}),
  isTouch: false
};

export const ScrollSmoother = {
  create: () => ({
    scrollTop: () => {},
    paused: () => {},
    scrollTo: () => {}
  }),
  refresh: () => {}
};

export const SplitText = function() {
  this.chars = [];
  this.words = [];
  this.lines = [];
  this.revert = () => {};
};

export default {
  ScrollTrigger,
  ScrollSmoother,
  SplitText
};
