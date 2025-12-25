/*
   This extension was made with DinoBuilder!
   https://dinobuilder.vercel.app/
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

    const ExtForge_Utils = {
        // from https://jwklong.github.io/extforge
        Broadcasts: new function() {
            this.raw_ = {};
            this.register = (name, blocks) => {
                this.raw_[name] = blocks;
            };
            this.execute = async (name) => {
                if (this.raw_[name]) {
                    await this.raw_[name]();
                };
            };
        }
    }
    class Extension {
        getInfo() {
            return {
                "id": "literals",
                "name": "Literals",
                "color1": "#59c08e",
                "color2": "#4ab17f",
                "tbShow": true,
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        opcode: `null`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `null`,
        arguments: {},
        disableMonitor: false
    });
    Extension.prototype[`null`] = async (args, util) => {
        return null
    };

    blocks.push({
        opcode: `true`,
        blockType: Scratch.BlockType.BOOLEAN,
        hideFromPalette: false,
        text: `true`,
        arguments: {},
        disableMonitor: false
    });
    Extension.prototype[`true`] = async (args, util) => {
        return true
    };

    blocks.push({
        opcode: `false`,
        blockType: Scratch.BlockType.BOOLEAN,
        hideFromPalette: false,
        text: `false`,
        arguments: {},
        disableMonitor: false
    });
    Extension.prototype[`false`] = async (args, util) => {
        return false
    };

    blocks.push({
        opcode: `random`,
        blockType: Scratch.BlockType.BOOLEAN,
        hideFromPalette: false,
        text: `random`,
        arguments: {},
        disableMonitor: false
    });
    Extension.prototype[`random`] = async (args, util) => {
        return Boolean(Math.round(Math.random()))
    };

    blocks.push({
        opcode: `number`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `( [num] )`,
        arguments: {
            "num": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`number`] = async (args, util) => {
        return args["num"]
    };

    blocks.push({
        opcode: `degree`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `( [angle]° )`,
        arguments: {
            "angle": {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 0,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`degree`] = async (args, util) => {
        return args["angle"]
    };

    blocks.push({
        opcode: `text`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `' [string] '`,
        arguments: {
            "string": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'string',
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`text`] = async (args, util) => {
        return args["string"]
    };

    blocks.push({
        opcode: `color`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `[color]`,
        arguments: {
            "color": {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ff0000',
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`color`] = async (args, util) => {
        return args["color"]
    };

    blocks.push({
        blockType: Scratch.BlockType.XML,
        xml: `<sep gap='48'/>`,
    });

    blocks.push({
        opcode: `newLine`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `new line`,
        arguments: {},
        disableMonitor: true
    });
    Extension.prototype[`newLine`] = async (args, util) => {
        return

    };

    blocks.push({
        opcode: `tabCharacter`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `tab character`,
        arguments: {},
        disableMonitor: true
    });
    Extension.prototype[`tabCharacter`] = async (args, util) => {
        return
    };

    blocks.push({
        blockType: Scratch.BlockType.XML,
        xml: `<sep gap='48'/>`,
    });

    blocks.push({
        opcode: `blankArray`,
        blockType: Scratch.BlockType.REPORTER,
        blockShape: Scratch.BlockShape.SQUARE,
        hideFromPalette: false,
        text: `blank array`,
        arguments: {},
        disableMonitor: true
    });
    Extension.prototype[`blankArray`] = async (args, util) => {
        return []
    };

    blocks.push({
        opcode: `arrayofLength`,
        blockType: Scratch.BlockType.REPORTER,
        blockShape: Scratch.BlockShape.SQUARE,
        hideFromPalette: false,
        text: `array of length [a]`,
        arguments: {
            "a": {
                type: Scratch.ArgumentType.empty,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`arrayofLength`] = async (args, util) => {
        return Array(args["a"])
    };

    blocks.push({
        opcode: `blankObject`,
        blockType: Scratch.BlockType.REPORTER,
        blockShape: Scratch.BlockShape.PLUS,
        hideFromPalette: false,
        text: `blank object`,
        arguments: {},
        disableMonitor: true
    });
    Extension.prototype[`blankObject`] = async (args, util) => {
        return {}
    };

    Scratch.extensions.register(new Extension());
})(Scratch);