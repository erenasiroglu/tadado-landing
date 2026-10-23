/**
 * Inline JS that injects a third-party script on the first user interaction,
 * or a few seconds after `load`, so analytics never block first paint or LCP.
 * Calls made before that are queued by the vendor stubs (gtag / fbq).
 */
export function deferredScriptLoader(src: string, delayMs = 4000): string {
  return `
    (function () {
      var done = false;
      var events = ["pointerdown", "keydown", "touchstart", "scroll"];
      function load() {
        if (done) return;
        done = true;
        events.forEach(function (e) { window.removeEventListener(e, load); });
        var s = document.createElement("script");
        s.async = true;
        s.src = ${JSON.stringify(src)};
        document.head.appendChild(s);
      }
      events.forEach(function (e) { window.addEventListener(e, load, { once: true, passive: true }); });
      function later() { setTimeout(load, ${delayMs}); }
      if (document.readyState === "complete") later();
      else window.addEventListener("load", later, { once: true });
    })();
  `;
}
