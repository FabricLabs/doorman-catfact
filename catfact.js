const request = require('request');

module.exports = Doorman => {
  return {
    description: 'Gives a Random Cat Fact',
    process: (msg, suffix, isEdit, cb) => {
      request('https://catfact.ninja/fact',
      function (err, res, body) {
        try {
        if (err) throw err;
        var data = JSON.parse(body);
        if (data && data.fact) {
          cb({
            embed: {
              color: Doorman.Config.discord.defaultEmbedColor,
              title: 'Cat Fact',
              description: data.fact
            }
          }, msg);
        }
        } catch (err) {
          var msgTxt = `command cat_fact failed :disappointed_relieved:`;
          if (Doorman.Config.debug) {
            msgTxt += `\n${err.stack}`;
            
            Doorman.logError(err);
          }
          cb(msgTxt, msg);
        }
      });
    }
  };
};