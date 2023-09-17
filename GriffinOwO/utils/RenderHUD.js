import Settings from "../config";
import { userData } from "./UserData";
import { getGyroUsedTimeFormatted, getAlignmentTimeFormatted } from "../features/Combat/GyroTimer";
import { getFlareTimeFormatted } from "../features/Combat/FlareTimer";
import { getBlessing } from "../features/Dungeon/BlessingDisplay";
import { getDragonTimeFormatted } from "../features/Dungeon/DragonTimer";
import { getKuudraPointer } from "../features/Kuudra/KuudraHeadPointer";

let canDrag = false; // Prevent drag after click the "move" button
const Firework = new Item("fireworks");

function renderExampleText(coords, exampleText) {
    const scale = coords.scale;
    const x = coords.x;
    const y = coords.y;
    const xScale = x / scale;
    const yScale = y / scale;

    Renderer.scale(scale / 2);
    Renderer.drawString(`&b[x: ${Math.round(x)}, y: ${Math.round(y)}, scale (scroll): ${scale.toFixed(2)}]`, xScale * 2, yScale * 2 + 15);

    Renderer.scale(scale);
    Renderer.drawString(exampleText, xScale, yScale, true);
}

function renderText(coords, text) {
    const scale = coords.scale;
    const x = coords.x;
    const y = coords.y;
    const xScale = x / scale;
    const yScale = y / scale;

    Renderer.scale(scale);
    Renderer.drawString(text, xScale, yScale, true);
}

function renderTimeTracker(coords, text, currentTime, timeSplit1, timeSplit2) {
    if (currentTime > 0) {
        const scale = coords.scale;
        const x = coords.x;
        const y = coords.y;
        const color = currentTime > timeSplit1 ? "&a" : (currentTime > timeSplit2 ? "&e" : "&c&l");
        Renderer.scale(scale);
        Renderer.drawString(`${text}&f${color}${currentTime}s`, x / scale, y / scale, true);
    }
}

function renderIcon(coords, icon, ax, ay) {
    const scale = coords.scale;
    const x = coords.x;
    const y = coords.y;
    icon.draw(x - ax * scale, y - ay * scale, scale);
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
        renderTimeTracker(userData.gyroGUICoords, "&6&lGyro CD: ", gyroTime, 5, 2.5);
    }

    if (Settings.alignmentTracker) {
        if (Settings.alignmentGUI.isOpen()) {
            renderExampleText(userData.alignmentGUICoords, "&6&lAlignment: &f&a5.0s");
            return;
        }
        const alignmentTime = getAlignmentTimeFormatted();
        renderTimeTracker(userData.alignmentGUICoords, "&6&lAlignment: ", alignmentTime, 3, 1.5);
    }

    if (Settings.flareTimer) {
        if (Settings.flareTimerGUI.isOpen()) {
            renderExampleText(userData.flareTimerCoords, "&5&lSOS\n&f&a150s");
            renderIcon(userData.flareTimerCoords, Firework, 16, -0.5);
            return;
        }
        const [flareType, flareTime] = getFlareTimeFormatted();
        if (flareType !== "Unknow" && flareTime >= 0) {
            renderTimeTracker(userData.flareTimerCoords, `${flareType}\n`, flareTime, 30, 10);
            renderIcon(userData.flareTimerCoords, Firework, 16, -0.5);
        }
    }

    if (Settings.dragonTimer) {
        if (Settings.dragonTimerGUI.isOpen()) {
            renderExampleText(userData.dragonTimerCoords, "&c&lRed: &f&a3.25s");
            return;
        }
        const [dragonColor, spawnTime] = getDragonTimeFormatted();
        if (dragonColor !== null && spawnTime >= 0) {
            renderTimeTracker(userData.dragonTimerCoords, `${dragonColor}: `, spawnTime, 3, 1);
        }
    }

    if (Settings.kuudraHeadPointer) {
        if (Settings.kuudraHeadPointerGUI.isOpen()) {
            renderExampleText(userData.kuudraHeadPointerCoords, "§a↑");
            return;
        }
        const kuudraPointer = getKuudraPointer();
        if (kuudraPointer !== "") {
            renderText(userData.kuudraHeadPointerCoords, `${kuudraPointer}`);
        }
    }

    if (Settings.blessingTracker) {
        if (Settings.blessingDisplayGUI.isOpen()) {
            renderExampleText(userData.blessingCoords, "§cPower: 24\n§dTime: 5\n§eLife: 10\n§bWisdom: 12\n§aStone: 8");
            return;
        }

        const Blessing = getBlessing();
        if (Blessing[0]) {
            let displayText = "";

            if (Settings.blessingDisplayPower)
                displayText += `\n${Blessing[1].power.display}: ${Blessing[1].power.current}`;

            if (Settings.blessingDisplayTime)
                displayText += `\n${Blessing[1].time.display}: ${Blessing[1].time.current}`;

            if (Settings.blessingDisplayLife)
                displayText += `\n${Blessing[1].life.display}: ${Blessing[1].life.current}`;

            if (Settings.blessingDisplayWisdom)
                displayText += `\n${Blessing[1].wisdom.display}: ${Blessing[1].wisdom.current}`;

            if (Settings.blessingDisplayStone)
                displayText += `\n${Blessing[1].stone.display}: ${Blessing[1].stone.current}`;

            if (displayText !== "")
                renderText(userData.blessingCoords, `${displayText}`);
        }
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
    if (Settings.flareTimer)
        if (Settings.flareTimerGUI.isOpen()) {
            handleDragged(userData.flareTimerCoords, x, y);
            return;
        }
    if (Settings.dragonTimer)
        if (Settings.dragonTimerGUI.isOpen()) {
            handleDragged(userData.dragonTimerCoords, x, y);
            return;
        }
    if (Settings.kuudraHeadPointer)
        if (Settings.kuudraHeadPointerGUI.isOpen()) {
            handleDragged(userData.kuudraHeadPointerCoords, x, y);
            return;
        }
    if (Settings.blessingTracker)
        if (Settings.blessingDisplayGUI.isOpen()) {
            handleDragged(userData.blessingCoords, x, y);
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
    if (Settings.flareTimer)
        if (Settings.flareTimerGUI.isOpen()) {
            handleScroll(userData.flareTimerCoords, direction);
            return;
        }
    if (Settings.dragonTimer)
        if (Settings.dragonTimerGUI.isOpen()) {
            handleScroll(userData.dragonTimerCoords, direction);
            return;
        }
    if (Settings.kuudraHeadPointer)
        if (Settings.kuudraHeadPointerGUI.isOpen()) {
            handleScroll(userData.kuudraHeadPointerCoords, direction);
            return;
        }
    if (Settings.blessingTracker)
        if (Settings.blessingDisplayGUI.isOpen()) {
            handleScroll(userData.blessingCoords, direction);
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
