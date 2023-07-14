const eventListeners = [];

export function registerEventListener(conditions, event) {
    const listener = {
        conditions: conditions,
        event: event.unregister(),
        registered: false
    };
    eventListeners.push(listener);
}

export function unregisterEventListeners() {
    eventListeners.forEach(listener => {
        if (listener.registered) {
            listener.event.unregister();
            listener.registered = false;
        }
    });
}

export function initializeEventListeners() {
    eventListeners.forEach(listener => {
        if (listener.conditions() && !listener.registered) {
            //ChatLib.chat("Registed command");
            listener.event.register();
            listener.registered = true;
        }
    });
}

export function updateEventListeners() {
    eventListeners.forEach(listener => {
        //ChatLib.chat(`[${listener.conditions}: ${listener.conditions()}]`);
        if (listener.conditions() && !listener.registered) {
            listener.event.register();
            listener.registered = true;
        } else if (!listener.conditions() && listener.registered) {
            listener.event.unregister();
            listener.registered = false;
        }
    });
}
