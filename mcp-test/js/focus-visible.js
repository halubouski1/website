// focus-visible.js
// Lightweight focus-visible utility: adds "focus-visible" class when element receives focus via keyboard
// and removes it when focus is caused by pointer interaction or on blur.
// Exposes init() and destroy() on window.__focusVisible to allow cleanup if needed.

(function () {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    var hadKeyboardEvent = false;
    var hadFocusVisibleRecently = false;
    var hadFocusVisibleRecentlyTimeout = null;

    function isValidKey(e) {
        // Treat Tab and arrow/navigation keys and Space/Enter as keyboard modality starters.
        var k = e.key;
        return (
            k === 'Tab' ||
            k === 'ArrowUp' ||
            k === 'ArrowDown' ||
            k === 'ArrowLeft' ||
            k === 'ArrowRight' ||
            k === 'Home' ||
            k === 'End' ||
            k === 'PageUp' ||
            k === 'PageDown' ||
            k === 'Enter' ||
            k === ' '
        );
    }

    function focusTriggersKeyboardModality(el) {
        // Elements that should get focus-ring when focused by keyboard:
        var name = el.tagName;
        if (name === 'INPUT' || name === 'TEXTAREA' || el.isContentEditable) {
            // For inputs, some types (like checkbox/radio) are generally controlled by pointer,
            // but we keep it simple and let keyboard focus show ring as well.
            return true;
        }
        // links and buttons also benefit from keyboard indication
        if (name === 'A' || name === 'BUTTON' || el.hasAttribute('tabindex')) return true;
        return false;
    }

    function addFocusVisibleClass(el) {
        if (el.classList && !el.classList.contains('focus-visible')) {
            el.classList.add('focus-visible');
        }
    }

    function removeFocusVisibleClass(el) {
        if (el.classList && el.classList.contains('focus-visible')) {
            el.classList.remove('focus-visible');
        }
    }

    function onKeyDown(e) {
        if (isValidKey(e)) {
            hadKeyboardEvent = true;
        }
    }

    function onPointerDown() {
        hadKeyboardEvent = false;
    }

    function onFocusIn(e) {
        var target = e.target;
        if (target && target.nodeType === 1) {
            if (hadKeyboardEvent || focusTriggersKeyboardModality(target)) {
                addFocusVisibleClass(target);
            }
        }
    }

    function onFocusOut(e) {
        var target = e.target;
        if (target && target.nodeType === 1) {
            if (target.classList && target.classList.contains('focus-visible')) {
                // keep a tiny delay so programmatic focus changes don't briefly flash styles
                hadFocusVisibleRecently = true;
                window.clearTimeout(hadFocusVisibleRecentlyTimeout);
                hadFocusVisibleRecentlyTimeout = window.setTimeout(function () {
                    hadFocusVisibleRecently = false;
                }, 100);
                removeFocusVisibleClass(target);
            }
        }
    }

    function onVisibilityChange() {
        if (document.visibilityState === 'hidden') {
            // If the user switches tabs while using the keyboard, we want to assume keyboard modality on return.
            // Resetting hadKeyboardEvent avoids losing keyboard modality unexpectedly.
            hadKeyboardEvent = false;
        }
    }

    function init() {
        document.addEventListener('keydown', onKeyDown, true);
        document.addEventListener('mousedown', onPointerDown, true);
        document.addEventListener('pointerdown', onPointerDown, true);
        document.addEventListener('touchstart', onPointerDown, true);

        document.addEventListener('focusin', onFocusIn, true);
        document.addEventListener('focusout', onFocusOut, true);

        document.addEventListener('visibilitychange', onVisibilityChange, true);
    }

    function destroy() {
        document.removeEventListener('keydown', onKeyDown, true);
        document.removeEventListener('mousedown', onPointerDown, true);
        document.removeEventListener('pointerdown', onPointerDown, true);
        document.removeEventListener('touchstart', onPointerDown, true);

        document.removeEventListener('focusin', onFocusIn, true);
        document.removeEventListener('focusout', onFocusOut, true);

        document.removeEventListener('visibilitychange', onVisibilityChange, true);

        // remove any remaining classes added by the script
        var els = document.querySelectorAll('.focus-visible');
        for (var i = 0; i < els.length; i++) {
            removeFocusVisibleClass(els[i]);
        }

        window.clearTimeout(hadFocusVisibleRecentlyTimeout);
    }

    // Auto-init and expose API for manual control
    init();
    window.__focusVisible = {
        init: init,
        destroy: destroy
    };
})();