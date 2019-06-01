/**
 * Really just want to keep this all together, and give the Scene a contained interface for messaging between the parent and child windows
 */
export class Link {


    /**
     * Register window event listeners, just a way to pass in a few at at time
     * 
     * @param handlers : object : { "event-name" : function }
     */
    addWindowListeners(handlers) {
        for (const [event, handler] of Object.entries(handlers)) {
            window.addEventListener(event, handler);
        }
    }

    /**
     * Post message to show replay button
     * 
     * @param {*} event - message event name
     * @param {*} data - obj to send to iframe, defaults to "whatever"
     */
    postMessage(event, data = "*") {
        parent.postMessage(event, data);
    }

    /**
     * Dispatch window event
     * 
     * @param {*} eventName 
     * @param {*} data 
     */
    dispatchEvent(eventName, data = null) {
        window.dispatchEvent(new Event(eventName, data));
    }

    /**
     * Method that sets up the default reset mechanism. Called when replay is configured in the scene
     * @param {*} handler - replay handler
     */
    addReplay(handler) {
        this.addWindowListeners({
            "post-replay": this.postMessage.bind(this, "showReplay"),
            "message": handler
        });
    }

    /**
     * Easy enough
     */
    dispatchReplay() {
        this.dispatchEvent('post-replay');
    }
}