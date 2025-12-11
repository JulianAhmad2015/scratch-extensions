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
                "id": "Buff",
                "name": "Buff",
                "color1": "#ff9494",
                "blocks": [{
                    "opcode": "block_a3be5d678ec1f333",
                    "text": "buff [556194049464cff2]",
                    "blockType": "Boolean",
                    "arguments": {
                        "556194049464cff2": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_8cafa06ce8d235f3",
                    "text": "not [ee0c98d7cfaeec93]",
                    "blockType": "Boolean",
                    "arguments": {
                        "ee0c98d7cfaeec93": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_b19ef830285e26d8",
                    "text": "[a1d23b74771517f4] and [37e1d407e9d06daa]",
                    "blockType": "Boolean",
                    "arguments": {
                        "a1d23b74771517f4": {
                            "type": "Boolean"
                        },
                        "37e1d407e9d06daa": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_10695cd1e9effc34",
                    "text": "[79aaea68a80b0d21] nand [9035aaefbf5fa6a6]",
                    "blockType": "Boolean",
                    "arguments": {
                        "79aaea68a80b0d21": {
                            "type": "Boolean"
                        },
                        "9035aaefbf5fa6a6": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_39d43b318b499b10",
                    "text": "[cc1b66ae16086fa7] or [3b6cf91d0d595c02]",
                    "blockType": "Boolean",
                    "arguments": {
                        "cc1b66ae16086fa7": {
                            "type": "Boolean"
                        },
                        "3b6cf91d0d595c02": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_1bcbe6df3055b25b",
                    "text": "[ca4dd89c5d17115b] nor [c39a7d4d9ccc636f]",
                    "blockType": "Boolean",
                    "arguments": {
                        "ca4dd89c5d17115b": {
                            "type": "Boolean"
                        },
                        "c39a7d4d9ccc636f": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_fcaeaab9f979b41f",
                    "text": "[8c40fd05814a9500] xor [6b0d8318b86ae427]",
                    "blockType": "Boolean",
                    "arguments": {
                        "8c40fd05814a9500": {
                            "type": "Boolean"
                        },
                        "6b0d8318b86ae427": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_3a99e5bc794617b9",
                    "text": "[bc701de7b4cd1d17] xnor [9fa98f9f7c0ee65a]",
                    "blockType": "Boolean",
                    "arguments": {
                        "bc701de7b4cd1d17": {
                            "type": "Boolean"
                        },
                        "9fa98f9f7c0ee65a": {
                            "type": "Boolean"
                        }
                    }
                }]
            }
        }
        async block_a3be5d678ec1f333(args) {
            return (args["556194049464cff2"])
        }
        async block_8cafa06ce8d235f3(args) {
            return ((!args["ee0c98d7cfaeec93"]))
        }
        async block_b19ef830285e26d8(args) {
            return ((args["a1d23b74771517f4"] && args["37e1d407e9d06daa"]))
        }
        async block_10695cd1e9effc34(args) {
            return ((!(args["79aaea68a80b0d21"] && args["9035aaefbf5fa6a6"])))
        }
        async block_39d43b318b499b10(args) {
            return ((args["cc1b66ae16086fa7"] || args["3b6cf91d0d595c02"]))
        }
        async block_1bcbe6df3055b25b(args) {
            return ((!(args["ca4dd89c5d17115b"] || args["c39a7d4d9ccc636f"])))
        }
        async block_fcaeaab9f979b41f(args) {
            return ((args["8c40fd05814a9500"] != args["6b0d8318b86ae427"]))
        }
        async block_3a99e5bc794617b9(args) {
            return ((!(args["bc701de7b4cd1d17"] != args["9fa98f9f7c0ee65a"])))
        }
    }

    let extension = new Extension();
    // code compiled from extforge
    (async () => {
        eval(("alert(\"This is Logic Gates\")"))
    })();

    Scratch.extensions.register(extension);
})(Scratch);
