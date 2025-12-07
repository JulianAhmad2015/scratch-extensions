
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
                    throw new Error('Alerts must run unsandboxed');
                }

                class Extension {
                    getInfo() {
                        return {
                            "id": "alerts",
                            "name": "Alerts",
                            "color1": "#6400ff",
                            "blocks": blocks,
                            "menus": menus,
                        }
                    }
                }
                
blocks.push({
  opcode: "alerts_Block_alert",
  blockType: Scratch.BlockType.COMMAND,
  text: "alert[a]",
  arguments: {
      "a": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: `Hello!`
    },

  },
  disableMonitor: true
});
Extension.prototype["alerts_Block_alert"] = async function(args, util) {
  const localVars = {};
    alert(args["a"]);

};


blocks.push({
  opcode: "alerts_Block_prompt",
  blockType: Scratch.BlockType.REPORTER,
  text: "prompt[b]",
  arguments: {
      "b": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: `How are you?`
    },

  },
  disableMonitor: true
});
Extension.prototype["alerts_Block_prompt"] = async function(args, util) {
  const localVars = {};
    return prompt(args["b"]);
};


blocks.push({
  opcode: "alerts_Block_confirm",
  blockType: Scratch.BlockType.BOOLEAN,
  text: "confirm[c]",
  arguments: {
      "c": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: `Are you sure?`
    },

  },
  disableMonitor: true
});
Extension.prototype["alerts_Block_confirm"] = async function(args, util) {
  const localVars = {};
    return confirm(args["c"]);
};


                
                
                Scratch.extensions.register(new Extension());
            })(Scratch);
            