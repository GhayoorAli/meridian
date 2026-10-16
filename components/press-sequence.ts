import type Lenis from "lenis";

/*
 * Scroll-driven journal rows for the home page, ported from the reference press section.
 *
 * When a row reaches the middle of the viewport while the user scrolls, page scrolling is
 * paused and the wheel drives that row's timeline instead: the row opens (1.1s), its gallery
 * strip slides sideways, it closes (0.92s), and scrolling is handed back to the page. Every
 * 820px of wheel travel advances the timeline by one second; scrolling up plays it backwards.
 * Clicking a row jumps it open (or finishes it if already open).
 */

type Ease = (t: number) => number;
const linear: Ease = (t) => t;
const inOut: Ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const out2: Ease = (t) => 1 - (1 - t) ** 2;

type Tween = { start: number; dur: number; from: number; to: number; ease: Ease };

/** Value of a property at time `t`, given its tweens in start order (later tweens win). */
function valueAt(t: number, tweens: Tween[]) {
  let active = tweens[0];
  for (const tween of tweens) if (t >= tween.start) active = tween;
  const progress = Math.min(1, Math.max(0, (t - active.start) / active.dur));
  return active.from + (active.to - active.from) * active.ease(t < active.start ? 0 : progress);
}

export type SequenceParts = {
  row: HTMLElement;
  before: HTMLElement;
  after: HTMLElement;
  cover: HTMLElement;
  type: HTMLElement;
  left: HTMLElement;
  right: HTMLElement[];
  gallery: HTMLElement;
};

type Entry = {
  row: HTMLElement;
  height: number;
  canEnter: (direction: number) => boolean;
  move: (delta: number) => void;
  finish: (immediate?: boolean) => void;
};

const entries = new Set<Entry>();
let active: Entry | null = null;
let lenis: Lenis | null = null;

export function setSequenceLenis(instance: Lenis | null | undefined) {
  lenis = instance ?? null;
}

const anchorFor = (height: number) => Math.max(80, (window.innerHeight - height) / 2);

function release(entry: Entry) {
  if (active !== entry) return;
  active = null;
  lenis?.start();
}

function lock(entry: Entry, align: boolean) {
  if (active === entry) return true;
  if (active) return false;
  active = entry;
  if (align) {
    // Native scroll first; stopping Lenis afterwards resyncs it to the real position.
    const delta = entry.row.getBoundingClientRect().top - anchorFor(entry.height);
    window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
  }
  lenis?.stop();
  return true;
}

function isTyping(target: EventTarget | null) {
  return target instanceof Element && !!target.closest("input, textarea, select, [contenteditable='true']");
}

function onWheel(event: WheelEvent) {
  if (event.ctrlKey || event.defaultPrevented || isTyping(event.target)) return;
  const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
  let delta = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * unit;
  if (!delta) return;

  if (!active) {
    const direction = Math.sign(delta);
    // Rows the next wheel step would carry across their resting line.
    const candidates = [...entries].filter((entry) => {
      if (!entry.row.isConnected || !entry.canEnter(direction)) return false;
      const top = entry.row.getBoundingClientRect().top;
      const anchor = anchorFor(entry.height);
      return direction > 0
        ? top >= anchor - 40 && top <= anchor + Math.max(0, delta)
        : top <= anchor + 40 && top >= anchor + Math.min(0, delta);
    });
    candidates.sort((a, b) => {
      const ta = a.row.getBoundingClientRect().top;
      const tb = b.row.getBoundingClientRect().top;
      return direction > 0 ? ta - tb : tb - ta;
    });
    const next = candidates[0];
    if (!next) return;
    const offset = next.row.getBoundingClientRect().top - anchorFor(next.height);
    if (!lock(next, Math.sign(offset) === direction)) return;
    if (Math.sign(offset) === direction) delta -= offset;
  }

  event.preventDefault();
  event.stopImmediatePropagation();
  active?.move(delta);
}

function onKey(event: KeyboardEvent) {
  if (!active || event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) return;
  if (event.key === "Tab" || event.key === "Home" || event.key === "End") {
    active.finish(true);
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopImmediatePropagation();
    active.finish();
    return;
  }
  const step =
    event.key === "ArrowDown" || event.key === "ArrowRight"
      ? 120
      : event.key === "ArrowUp" || event.key === "ArrowLeft"
        ? -120
        : event.key === "PageDown" || (event.key === " " && !event.shiftKey)
          ? 480
          : event.key === "PageUp" || (event.key === " " && event.shiftKey)
            ? -480
            : 0;
  if (step) {
    event.preventDefault();
    event.stopImmediatePropagation();
    active.move(step);
  }
}

/** Wires one row into the shared wheel driver. Returns `toggle` (for clicks) and `dispose`. */
export function createSequence(parts: SequenceParts) {
  const { row, before, after, cover, type, left, right, gallery } = parts;
  const contents = [left, ...right];

  let tweens: Record<string, Tween[]> = {};
  let rightTweens: { x: Tween[]; alpha: Tween[] }[] = [];
  let duration = 1;
  let closeAt = 1;

  const build = () => {
    const stage = row.clientWidth;
    const rest = Math.max(0, (stage - 344) / 2);
    const open = Math.max(340, (stage - 600) / 2);
    // The strip at full height: each 4:5 photograph is 416px wide at 520px tall, 16px apart.
    const count = gallery.children.length;
    const strip = count ? count * 416 + (count - 1) * 16 : 0;
    const wide = Math.max(300, open) + (strip ? strip + 80 : 0);
    const overflow = Math.max(0, open + 520 + 80 + wide - stage);
    const read = Math.max(0.45, overflow / 780);
    const height = 526;
    closeAt = 1.48 + read + 0.38;
    duration = closeAt + 0.92;
    const typeShift = -(open - type.offsetWidth);
    const pair = (a: number, b: number, openDur = 1.1, closeDur = 0.92): Tween[] => [
      { start: 0, dur: openDur, from: a, to: b, ease: inOut },
      { start: closeAt, dur: closeDur, from: b, to: a, ease: inOut },
    ];
    tweens = {
      height: pair(264, height),
      cover: pair(264, 520),
      before: pair(rest, open),
      after: pair(rest, wide),
      gallery: pair(264, 520),
      type: pair(0, typeShift),
      leftX: [
        { start: 0.19, dur: 0.82, from: -64, to: 0, ease: out2 },
        { start: closeAt, dur: 0.5, from: 0, to: -64, ease: inOut },
      ],
      leftAlpha: [
        { start: 0.19, dur: 0.82, from: 0, to: 1, ease: out2 },
        { start: closeAt, dur: 0.42, from: 1, to: 0, ease: inOut },
      ],
      scroll: [
        { start: 1.48, dur: read, from: 0, to: overflow, ease: linear },
        { start: closeAt, dur: 0.92, from: overflow, to: 0, ease: inOut },
      ],
    };
    rightTweens = right.map((_, index) => ({
      x: [
        { start: 0.26 + index * 0.08, dur: 0.8, from: 80, to: 0, ease: out2 },
        { start: closeAt, dur: 0.5, from: 0, to: 80, ease: inOut },
      ],
      alpha: [
        { start: 0.26 + index * 0.08, dur: 0.8, from: 0, to: 1, ease: out2 },
        { start: closeAt, dur: 0.42, from: 1, to: 0, ease: inOut },
      ],
    }));
  };

  let expanded: boolean | null = null;
  const setExpanded = (value: boolean) => {
    if (expanded === value) return;
    expanded = value;
    row.setAttribute("aria-expanded", String(value));
    row.dataset.open = String(value);
    contents.forEach((element) => {
      element.inert = !value;
      element.setAttribute("aria-hidden", String(!value));
    });
  };

  let time = 0;
  const render = () => {
    const v = (name: string) => valueAt(time, tweens[name]);
    row.style.height = `${v("height")}px`;
    cover.style.width = cover.style.height = `${v("cover")}px`;
    before.style.width = `${v("before")}px`;
    after.style.width = `${v("after")}px`;
    gallery.style.height = `${v("gallery")}px`;
    type.style.transform = `translateX(${v("type")}px)`;
    const alpha = v("leftAlpha");
    left.style.transform = `translateX(${v("leftX")}px)`;
    left.style.opacity = String(alpha);
    left.style.visibility = alpha > 0 ? "visible" : "hidden";
    right.forEach((element, index) => {
      const a = valueAt(time, rightTweens[index].alpha);
      element.style.transform = `translateX(${valueAt(time, rightTweens[index].x)}px)`;
      element.style.opacity = String(a);
      element.style.visibility = a > 0 ? "visible" : "hidden";
    });
    row.scrollLeft = v("scroll");
    setExpanded(time > 0.44 && time < closeAt + 0.35);
  };

  // Smoothly chase the target time, like a GSAP quickTo on the timeline's playhead.
  let target = 0;
  let frame = 0;
  let tween: { from: number; to: number; start: number; dur: number } | null = null;
  const tick = (now: number) => {
    if (!tween) return;
    const progress = Math.min(1, (now - tween.start) / (tween.dur * 1000));
    time = tween.from + (tween.to - tween.from) * out2(progress);
    render();
    if (progress < 1) {
      frame = requestAnimationFrame(tick);
    } else {
      tween = null;
      if (target <= 0 || target >= duration) release(entry);
    }
  };
  const goTo = (value: number, immediate = false) => {
    target = Math.min(duration, Math.max(0, value));
    cancelAnimationFrame(frame);
    if (immediate) {
      tween = null;
      time = target;
      render();
      release(entry);
      return;
    }
    tween = {
      from: time,
      to: target,
      start: performance.now(),
      dur: Math.min(1.1, Math.max(0.38, Math.abs(target - time))),
    };
    frame = requestAnimationFrame(tick);
  };

  const entry: Entry = {
    row,
    height: 526,
    canEnter: (direction) => (direction > 0 ? target < duration - 0.001 : target > 0.001),
    move: (delta) => {
      const next = Math.min(duration, Math.max(0, target + (180 * Math.tanh(delta / 180)) / 820));
      if (next !== target) goTo(next);
      else if (!tween && (next === 0 || next === duration)) release(entry);
    },
    finish: (immediate) => goTo(duration, immediate),
  };

  const onResize = () => {
    const wasPastHalf = target >= duration / 2;
    if (active === entry) entry.finish(true);
    build();
    target = time = wasPastHalf ? duration : 0;
    render();
  };

  build();
  render();

  if (!entries.size) {
    window.addEventListener("wheel", onWheel, { capture: true, passive: false });
    window.addEventListener("keydown", onKey, { capture: true });
  }
  entries.add(entry);
  window.addEventListener("resize", onResize);

  return {
    toggle: () => {
      if (lock(entry, true)) goTo(expanded ? duration : 1.1);
    },
    dispose: () => {
      cancelAnimationFrame(frame);
      release(entry);
      entries.delete(entry);
      if (!entries.size) {
        window.removeEventListener("wheel", onWheel, { capture: true });
        window.removeEventListener("keydown", onKey, { capture: true });
      }
      window.removeEventListener("resize", onResize);
      [row, before, after, cover, type, left, gallery, ...right].forEach((element) =>
        element.removeAttribute("style"),
      );
      contents.forEach((element) => {
        element.inert = true;
        element.setAttribute("aria-hidden", "true");
      });
      row.setAttribute("aria-expanded", "false");
      row.dataset.open = "false";
    },
  };
}
