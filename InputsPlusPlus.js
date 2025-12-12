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
                "id": "inputspp",
                "name": "Inputs++",
                "color1": "#120fbd",
                "blocks": [{
                    "opcode": "block_a8f59a74feee1888",
                    "text": "key [45263d66dc919714] pressed?",
                    "blockType": "Boolean",
                    "arguments": {
                        "45263d66dc919714": {
                            "type": "string",
                            "defaultValue": "any"
                        }
                    }
                }, {
                    "opcode": "block_ed8b7c388bd727f3",
                    "text": "mouse x",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_dd65e41caf52c6c9",
                    "text": "mouse y",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_58cf4e4f3db9bc39",
                    "text": "mouse down?",
                    "blockType": "Boolean",
                    "arguments": {}
                }]
            }
        }
        async block_a8f59a74feee1888(args) {
            return (Scratch.vm.runtime.ioDevices.keyboard.getKeyIsDown(args["45263d66dc919714"]))
        }
        async block_ed8b7c388bd727f3(args) {
            return (Scratch.vm.runtime.ioDevices.mouse.getScratchX())
        }
        async block_dd65e41caf52c6c9(args) {
            return (Scratch.vm.runtime.ioDevices.mouse.getScratchY())
        }
        async block_58cf4e4f3db9bc39(args) {
            return (Scratch.vm.runtime.ioDevices.mouse.getIsDown())
        }
    }

    let extension = new Extension();
    // code compiled from extforge

    Scratch.extensions.register(extension);
})(Scratch);
