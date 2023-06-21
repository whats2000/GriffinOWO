import Settings from "../config";
import { userData } from "./UserData";
import { getGyroUsedTimeFormatted, getAlignmentTimeFormatted } from "../features/Combat/GyroTimer";

let canDrag = false; // Prevent drag after click the "move" button

function renderExampleText(coords, exampleText) {
    const scale = coords.scale;
    const x = coords.x;
    const y = coords.y;
    const xScale = x / scale;
    const yScale = y / scale;

    Renderer.scale(scale / 2);
    Renderer.drawString(`&b[x: ${Math.round(x)}, y: ${Math.round(y)}, scale (scroll): ${scale.toFixed(2)}]`, xScale * 2, yScale * 2 + 15);

    Renderer.scale(scale);
    Renderer.drawString(exampleText, xScale, yScale);
}

function renderTimeTracker(coords, text, currentTime, timeSplit1, timeSplit2) {
    if (currentTime > 0) {
        const scale = coords.scale;
        const x = coords.x;
        const y = coords.y;
        const color = currentTime > timeSplit1 ? "&a" : (currentTime > timeSplit2 ? "&e" : "&c&l");
        Renderer.scale(scale);
        Renderer.drawString(`${text} &f${color}${currentTime}s`, x / scale, y / scale);
    }
}

function handleDragged(coords, x, y) {
    coords.x = x;
    coords.y = y;
    userData.save();
}

function handleScroll(coords, direction) {
    if (direction == 1) {
        coords.scale += coords.scale < 10 ? 0.1 : 0;
    } else if (direction == -1) {
        coords.scale -= coords.scale > 0 ? 0.1 : 0;
    }
    userData.save();
}

register("renderOverlay", () => {
    if (Settings.gyroCoolDownTracker) {
        if (Settings.gyroGUI.isOpen()) {
            renderExampleText(userData.gyroGUICoords, "&6&lGyro CD: &f&a5.0s");
            return;
        }
        const gyroTime = getGyroUsedTimeFormatted();
        renderTimeTracker(userData.gyroGUICoords, "&6&lGyro CD:", gyroTime, 5, 2.5);
    }
    if (Settings.alignmentTracker) {
        if (Settings.alignmentGUI.isOpen()) {
            renderExampleText(userData.alignmentGUICoords, "&6&lAlignment: &f&a5.0s");
            return;
        }
        const alignmentTime = getAlignmentTimeFormatted();
        renderTimeTracker(userData.alignmentGUICoords, "&6&lAlignment:", alignmentTime, 3, 1.5);
    }
});

register('dragged', (dx, dy, x, y, button) => {
    if (!canDrag) return;

    if (Settings.gyroCoolDownTracker)
        if (Settings.gyroGUI.isOpen()) {
            handleDragged(userData.gyroGUICoords, x, y);
            return;
        }
    if (Settings.alignmentTracker)
        if (Settings.alignmentGUI.isOpen()) {
            handleDragged(userData.alignmentGUICoords, x, y);
            return;
        }
});

register('scrolled', (x, y, direction) => {
    if (Settings.gyroCoolDownTracker)
        if (Settings.gyroGUI.isOpen()) {
            handleScroll(userData.gyroGUICoords, direction);
            return;
        }
    if (Settings.alignmentTracker)
        if (Settings.alignmentGUI.isOpen()) {
            handleScroll(userData.alignmentGUICoords, direction);
            return;
        }
});

register("guiOpened", () => {
    setTimeout(() => {
        canDrag = true;
    }, 1000);
});

register("guiClosed", () => {
    canDrag = false;
});
