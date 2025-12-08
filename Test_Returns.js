/*
   ~This was made with ⚡ElectraMod - Electrabuilder!~
   https://electrabuilder.vercel.app/
*/
(async function(Scratch) {
    const variables = {};
    const blocks = [];
    const menus = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    function doSound(ab, cd, runtime) {
        const audioEngine = runtime.audioEngine;

        const fetchAsArrayBufferWithTimeout = (url) =>
            new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                let timeout = setTimeout(() => {
                    xhr.abort();
                    reject(new Error("Timed out"));
                }, 5000);
                xhr.onload = () => {
                    clearTimeout(timeout);
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    } else {
                        reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
                    }
                };
                xhr.onerror = () => {
                    clearTimeout(timeout);
                    reject(new Error(`Failed to request ${url}`));
                };
                xhr.responseType = "arraybuffer";
                xhr.open("GET", url);
                xhr.send();
            });

        const soundPlayerCache = new Map();

        const decodeSoundPlayer = async (url) => {
            const cached = soundPlayerCache.get(url);
            if (cached) {
                if (cached.sound) {
                    return cached.sound;
                }
                throw cached.error;
            }

            try {
                const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
                const soundPlayer = await audioEngine.decodeSoundPlayer({
                    data: {
                        buffer: arrayBuffer,
                    },
                });
                soundPlayerCache.set(url, {
                    sound: soundPlayer,
                    error: null,
                });
                return soundPlayer;
            } catch (e) {
                soundPlayerCache.set(url, {
                    sound: null,
                    error: e,
                });
                throw e;
            }
        };

        const playWithAudioEngine = async (url, target) => {
            const soundBank = target.sprite.soundBank;

            let soundPlayer;
            try {
                const originalSoundPlayer = await decodeSoundPlayer(url);
                soundPlayer = originalSoundPlayer.take();
            } catch (e) {
                console.warn(
                    "Could not fetch audio; falling back to primitive approach",
                    e
                );
                return false;
            }

            soundBank.addSoundPlayer(soundPlayer);
            await soundBank.playSound(target, soundPlayer.id);

            delete soundBank.soundPlayers[soundPlayer.id];
            soundBank.playerTargets.delete(soundPlayer.id);
            soundBank.soundEffects.delete(soundPlayer.id);

            return true;
        };

        const playWithAudioElement = (url, target) =>
            new Promise((resolve, reject) => {
                const mediaElement = new Audio(url);

                mediaElement.volume = target.volume / 100;

                mediaElement.onended = () => {
                    resolve();
                };
                mediaElement
                    .play()
                    .then(() => {
                        // Wait for onended
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });

        const playSound = async (url, target) => {
            try {
                if (!(await Scratch.canFetch(url))) {
                    throw new Error(`Permission to fetch ${url} denied`);
                }

                const success = await playWithAudioEngine(url, target);
                if (!success) {
                    return await playWithAudioElement(url, target);
                }
            } catch (e) {
                console.warn(`All attempts to play ${url} failed`, e);
            }
        };

        playSound(ab, cd)
    }

    const supportsRenderedTargetExport = Scratch.vm.exports && Scratch.vm.exports.RenderedTarget;

    function isSpriteInternal(v) {
        if (supportsRenderedTargetExport) {
            return v instanceof Scratch.vm.exports.RenderedTarget;
        }
        return v != undefined && typeof v === "object";
    }
    class Extension {
        getInfo() {
            return {
                "id": "testreturns",
                "name": "Test Returns",
                "color1": "#6a6696",
                "color2": "#77759f",
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        opcode: `why`,
        blockType: Scratch.BlockType.LABEL,
        text: `Object and Arrays can support NitroBolt and ElectraMod`,
        disableMonitor: true
    });

    blocks.push({
        opcode: `reporter`,
        blockType: Scratch.BlockType.REPORTER,
        text: `reporter[r]`,
        arguments: {
            "r": {
                type: Scratch.ArgumentType.empty,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`reporter`] = async (args, util) => {
        return args["r"]
    };

    blocks.push({
        opcode: `boolean`,
        blockType: Scratch.BlockType.BOOLEAN,
        text: `boolean[b]`,
        arguments: {
            "b": {
                type: Scratch.ArgumentType.BOOLEAN,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`boolean`] = async (args, util) => {
        return args["b"]
    };

    blocks.push({
        opcode: `object`,
        blockType: Scratch.BlockType.OBJECT,
        text: `object[o]`,
        arguments: {
            "o": {
                type: Scratch.ArgumentType.OBJECT,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`object`] = async (args, util) => {
        return args["o"]
    };

    blocks.push({
        opcode: `array`,
        blockType: Scratch.BlockType.ARRAY,
        text: `array[a]`,
        arguments: {
            "a": {
                type: Scratch.ArgumentType.ARRAY,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`array`] = async (args, util) => {
        return args["a"]
    };

    Scratch.extensions.register(new Extension());
})(Scratch);