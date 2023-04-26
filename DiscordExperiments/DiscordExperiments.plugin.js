/**
 * @name DiscordExperiments
 * @author Tymon3310
 * @authorId 541278426347208746
 * @description Enables the ability to use discord experiments
 * @version 1.0
 * @source https://github.com/Tymon3310/BetterDiscordPlugins/tree/main/DiscordExperiments
 */

module.exports = class discordExperiments {
  start() {
    BdApi.showToast("Now you use DiscordExperiments V1.0", {type:"info",icon: true,timeout: 7500,forceShow: true});
    try {
      let wpRequire;
      window.webpackChunkdiscord_app.push([
        [Math.random()],
        {},
        (req) => {
          wpRequire = req;
        },
      ]);
      let mod = Object.values(wpRequire.c).find((x) => typeof x?.exports?.Z?.isDeveloper !== "undefined");
      let usermod = Object.values(wpRequire.c).find((x) => x?.exports?.default?.getUsers);
      let nodes = Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes);
      try {
        nodes.find((x) => x.name == "ExperimentStore").actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } });
      } catch (e) {}
      let oldGetUser = usermod.exports.default.__proto__.getCurrentUser;
      usermod.exports.default.__proto__.getCurrentUser = () => ({ isStaff: () => true });
      nodes.find((x) => x.name == "DeveloperExperimentStore").actionHandler["CONNECTION_OPEN"]();
      usermod.exports.default.__proto__.getCurrentUser = oldGetUser;
    } catch (err) {
      BdApi.showNotice(
        "DiscordExperiments Plugin error",
        {
          type: "error",
          buttons: [
            {
              label: "Report",
              onClick: () => window.open("https://github.com/vincentwang0905/DiscordExperiments/issues", "mozillaTab")
            }
          ]
        }
      );
      return BdApi.showNotice(
        `Error: ${err}`,
        {
          type: "error",
          buttons: [
            {
              label: "Report",
              onClick: () => window.open("https://github.com/vincentwang0905/DiscordExperiments/issues", "mozillaTab")
            }
          ]
        }
      );
    }
  }

  stop() {
    BdApi.showNotice("You need to reboot BD for disabling Experiments", {
      type: "warning",
      buttons: [{
        label: "Reboot BD",
        onClick: () => location.reload()
      }]
    });
  }
}
