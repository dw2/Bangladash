var Backbone = require('backbone'),
    _ = require('underscore');

module.exports = Backbone.Model.extend({
  // We want to be able to retrieve the member object representing
    // the person who finished this task. So we define it as an method
    // on the task model for convenience.
    member: function () {
        return app.team.members.get(this.get('from'));
    }
});
