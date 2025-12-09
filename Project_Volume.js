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
                "id": "volumeproject",
                "name": "Project Volume",
                "color1": "#cf63cf",
                "color2": "#874087",
                "tbShow": true,
                "blocks": blocks,
                "menus": menus
            }
        }
    }
    blocks.push({
        opcode: `volume`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `get volume of[volume]`,
        arguments: {
            "volume": {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Sprite1',
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`volume`] = async (args, util) => {
        return (args["volume"] !== undefined ? args["volume"].volume : 0)
    };

    blocks.push({
        blockType: Scratch.BlockType.XML,
        xml: `<sep gap='40'/>`,
    });

    blocks.push({
        opcode: `setprojectvolume`,
        blockType: Scratch.BlockType.COMMAND,
        hideFromPalette: false,
        text: `set project volume to[set]`,
        arguments: {
            "set": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`setprojectvolume`] = async (args, util) => {
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = args["set"] / 100;
    };

    blocks.push({
        opcode: `changeprojectvolume`,
        blockType: Scratch.BlockType.COMMAND,
        hideFromPalette: false,
        text: `change project volume by[change]`,
        arguments: {
            "change": {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -10,
            },
        },
        disableMonitor: true
    });
    Extension.prototype[`changeprojectvolume`] = async (args, util) => {
        let volume = Scratch.vm.runtime.audioEngine.inputNode.gain.value;
        Scratch.vm.runtime.audioEngine.inputNode.gain.value = args["change"] / 100 + volume;
    };

    blocks.push({
        opcode: `get`,
        blockType: Scratch.BlockType.REPORTER,
        hideFromPalette: false,
        text: `get project volume`,
        arguments: {},
        disableMonitor: true
    });
    Extension.prototype[`get`] = async (args, util) => {
        return Scratch.vm.runtime.audioEngine.inputNode.gain.value * 100
    };

    Scratch.extensions.register(new Extension());
})(Scratch);