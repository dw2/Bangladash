var Backbone = require('backbone'),
    Chat = require('models/chat');


module.exports = Backbone.Collection.extend({
    type: 'chats',
    model: Chat,
    fetch: function () {
        var self = this;
        //we just grab the first team for demo purposes
        app.api.getChatHistory(app.team.id, function (err, chats) {
            // Inflate our backbone models and collections
            self.reset(chats);
        });
    }
});
