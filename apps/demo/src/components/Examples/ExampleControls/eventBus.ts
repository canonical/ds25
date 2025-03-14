class EventBus extends EventTarget {
  emit(event, detail, evtRoot?: HTMLElement) {
    const customEvent = new CustomEvent(event, { detail });
    console.log({event, detail, evtRoot});
    // if (evtRoot) {
      evtRoot?.dispatchEvent(customEvent);
    // } else {
      this.dispatchEvent(customEvent);
    // }
  }

  subscribe(event, callback) {
    const handler = (e) => callback(e.detail);
    this.addEventListener(event, handler);
    return () => this.removeEventListener(event, handler);
  }
}

export const eventBus = new EventBus();