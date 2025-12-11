/*
   Created with ExtForge
   https://jwklong.github.io/extforge
*/
(async function(Scratch) {
    const variables = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    const ExtForge = {
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
        },

        Variables: new function() {
            this.raw_ = {};
            this.set = (name, value) => {
                this.raw_[name] = value;
            };
            this.get = (name) => {
                return this.raw_[name] ?? null;
            }
        },

        Vector: class {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            static from(v) {
                if (v instanceof ExtForge.Vector) return v
                if (v instanceof Array) return new ExtForge.Vector(Number(v[0]), Number(v[1]))
                if (v instanceof Object) return new ExtForge.Vector(Number(v.x), Number(v.y))
                return new ExtForge.Vector()
            }

            add(v) {
                return new Vector(this.x + v.x, this.y + v.y);
            }

            set(x, y) {
                return new Vector(x ?? this.x, y ?? this.y)
            }
        },

        Utils: {
            setList: (list, index, value) => {
                [...list][index] = value;
                return list;
            },
            lists_foreach: {
                index: [0],
                value: [null],
                depth: 0
            },
            countString: (x, y) => {
                return y.length == 0 ? 0 : x.split(y).length - 1
            }
        }
    }

    class Extension {
        getInfo() {
            return {
                "id": "runtime",
                "name": "Runtime",
                "color1": "#404040",
                "blocks": [{
                    "opcode": "block_c011198d0b761f83",
                    "text": "start project",
                    "blockType": "command",
                    "arguments": {}
                }, {
                    "opcode": "block_5ef0346f3ce6f9bf",
                    "text": "stop project",
                    "blockType": "command",
                    "arguments": {}
                }, {
                    "opcode": "block_3fbfc25770791cde",
                    "text": "project running?",
                    "blockType": "Boolean",
                    "arguments": {}
                }, {
                    "opcode": "block_bc301c9402fc0b80",
                    "text": "project timer",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_198e7deb1aa5d953",
                    "text": "set turbo mode to [0fcb16b06bb5a637]",
                    "blockType": "command",
                    "arguments": {
                        "0fcb16b06bb5a637": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_5baa22adc5e5fa23",
                    "text": "turbo mode enabled?",
                    "blockType": "Boolean",
                    "arguments": {}
                }, {
                    "opcode": "block_85b998ae7db557c8",
                    "text": "set frame rate to [943ca5605cbe7328]",
                    "blockType": "command",
                    "arguments": {
                        "943ca5605cbe7328": {
                            "type": "number",
                            "defaultValue": 30
                        }
                    }
                }, {
                    "opcode": "block_def75838cc1d8344",
                    "text": "frame rate",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_8e96a845ec99dbaa",
                    "text": "broadcast project [7f7b2c1da50eb04a]",
                    "blockType": "command",
                    "arguments": {
                        "7f7b2c1da50eb04a": {
                            "type": "string",
                            "defaultValue": "broadcast1"
                        }
                    }
                }]
            }
        }
        async block_c011198d0b761f83(args) {
            Scratch.vm.greenFlag();
        }
        async block_5ef0346f3ce6f9bf(args) {
            Scratch.vm.stopAll();
        }
        async block_3fbfc25770791cde(args) {
            return ((Scratch.vm.runtime.threads.length > 0))
        }
        async block_bc301c9402fc0b80(args) {
            return (Scratch.vm.runtime.ioDevices.clock.projectTimer())
        }
        async block_198e7deb1aa5d953(args) {
            Scratch.vm.runtime.turboMode = args["0fcb16b06bb5a637"];
        }
        async block_5baa22adc5e5fa23(args) {
            return (Scratch.vm.runtime.turboMode)
        }
        async block_85b998ae7db557c8(args) {
            Scratch.vm.runtime.frameLoop.setFramerate(args["943ca5605cbe7328"]);
        }
        async block_def75838cc1d8344(args) {
            return (Scratch.vm.runtime.frameLoop.framerate)
        }
        async block_8e96a845ec99dbaa(args) {
            Scratch.vm.runtime.startHats("event_whenbroadcastreceived", {
                BROADCAST_OPTION: args["7f7b2c1da50eb04a"]
            })
        }
    }

    let extension = new Extension();
    // code compiled from extforge

    Scratch.extensions.register(extension);
})(Scratch);
