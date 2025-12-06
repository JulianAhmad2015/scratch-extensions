
            // Made with PenguinBuilder 3.7.1
            // use PenguinBuilder at "https://chickencuber.github.io/PenguinBuilder/"
            (async function(Scratch) {
                const blocks = [];
                const vars = {};
                const menus = {};

                function wait(m) {
                    return new Promise((r) => setTimeout(() => r(), m));
                }

                

                class Extension {
                    getInfo() {
                        return {
                            "id": "base64nurl",
                            "name": "Base64 & URL",
                            "color1": "#888888",
                            "blocks": blocks,
                            "menus": menus,
                        }
                    }
                }
                
blocks.push({
  opcode: "base64nurl_Block_decodebase64",
  blockType: Scratch.BlockType.REPORTER,
  text: "decode base64[b64]",
  arguments: {
      "b64": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: `SGVsbG8=`
    },

  },
  disableMonitor: true
});
Extension.prototype["base64nurl_Block_decodebase64"] = async function(args, util) {
  const localVars = {};
    return (atob(args["b64"]));
};


blocks.push({
  opcode: "base64nurl_Block_decodeurl",
  blockType: Scratch.BlockType.REPORTER,
  text: "decode url[decodeurl]",
  arguments: {
      "decodeurl": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: ``
    },

  },
  disableMonitor: true
});
Extension.prototype["base64nurl_Block_decodeurl"] = async function(args, util) {
  const localVars = {};
    return (decodeURI(args["decodeurl"]));
};


blocks.push({
  opcode: "base64nurl_Block_encodeurl",
  blockType: Scratch.BlockType.REPORTER,
  text: "encode url[encodeurl]",
  arguments: {
      "encodeurl": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: ``
    },

  },
  disableMonitor: true
});
Extension.prototype["base64nurl_Block_encodeurl"] = async function(args, util) {
  const localVars = {};
    return (encodeURI(args["encodeurl"]));
};


blocks.push({
  opcode: "base64nurl_Block_encodebase64",
  blockType: Scratch.BlockType.REPORTER,
  text: "encode base64[2b64]",
  arguments: {
      "2b64": {
      type: Scratch.ArgumentType.STRING,
      defaultValue: `Hello`
    },

  },
  disableMonitor: true
});
Extension.prototype["base64nurl_Block_encodebase64"] = async function(args, util) {
  const localVars = {};
    return (btoa(args["2b64"]));
};


                
                
                Scratch.extensions.register(new Extension());
            })(Scratch);
            