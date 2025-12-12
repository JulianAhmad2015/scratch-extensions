
            // Made with PenguinBuilder 3.7.1
            // use PenguinBuilder at "https://chickencuber.github.io/PenguinBuilder/"
            (async function(Scratch) {
                const blocks = [];
                const vars = {};
                const menus = {};

                function wait(m) {
                    return new Promise((r) => setTimeout(() => r(), m));
                }

                if (!Scratch.extensions.unsandboxed) {
                    throw new Error('Utils must run unsandboxed');
                }

                class Extension {
                    getInfo() {
                        return {
                            "id": "utils",
                            "name": "Utils",
                            "color1": "#00e5ff",
                            "blocks": blocks,
                            "menus": menus,
                        }
                    }
                }
                
blocks.push({
  opcode: "utils_Block_any",
  blockType: Scratch.BlockType.REPORTER,
  text: "to any [ny]",
  arguments: {
      "ny": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: ``
    },

  },
  disableMonitor: true
});
Extension.prototype["utils_Block_any"] = async function(args, util) {
  const localVars = {};
    return args["ny"];
};


blocks.push({
  opcode: "utils_Block_bool",
  blockType: Scratch.BlockType.BOOLEAN,
  text: "random bool",
  arguments: {

  },
  disableMonitor: false
});
Extension.prototype["utils_Block_bool"] = async function(args, util) {
  const localVars = {};
    return (Math.round(Math.random()) === 1);
};


blocks.push({
  opcode: "utils_Block_triplebar",
  blockType: Scratch.BlockType.BOOLEAN,
  text: "[1]≡[2]",
  arguments: {
      "1": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: ``
    },
  "2": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: ``
    },

  },
  disableMonitor: true
});
Extension.prototype["utils_Block_triplebar"] = async function(args, util) {
  const localVars = {};
    return args["1"] === args["2"];
};


blocks.push({
  opcode: "utils_Block_nottriplebar",
  blockType: Scratch.BlockType.BOOLEAN,
  text: "[3]≢[4]",
  arguments: {
      "3": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: ``
    },
  "4": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: ``
    },

  },
  disableMonitor: true
});
Extension.prototype["utils_Block_nottriplebar"] = async function(args, util) {
  const localVars = {};
    return args["3"] !== args["4"];
};


                
                
                Scratch.extensions.register(new Extension());
            })(Scratch);
            