const commandQueue = [];
let lastExecutionTime = 0;

register("tick", () => {
    const currentTime = Date.now();

    if (currentTime - lastExecutionTime >= 500 && commandQueue.length > 0) {
        const command = commandQueue.shift();
        command();
        // ChatLib.chat(`[${currentTime.toString()}] excuting ${command.toString()}`);
        lastExecutionTime = currentTime;
    }
});

export function registerCommand(command) {
    commandQueue.push(command);
}