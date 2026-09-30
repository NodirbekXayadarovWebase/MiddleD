// ponytail: vueuc uses window.ResizeObserver and only falls back to @juggle/resize-observer,
// which every supported browser makes dead code — aliased here in vite.config.ts (~2.5 KB gzip).
export const ResizeObserver = window.ResizeObserver
