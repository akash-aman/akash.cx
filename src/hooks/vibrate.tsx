const vibrate = (duration = 30) => {
    if (!window) {
        return false;
    }

    if (!window.navigator) {
        return false;
    }

    if (!window.navigator.vibrate) {
        return false;
    }

    window.navigator.vibrate(duration);

    return true;
};

export default vibrate;
