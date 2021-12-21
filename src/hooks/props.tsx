export interface EventHandler<T extends Event = Event> {
  (e: T): void
}

export interface WindowEventHook {
  <K extends keyof WindowEventMap>(
    eventName: K,
    handler: EventHandler<WindowEventMap[K]>,
  ): void
}
