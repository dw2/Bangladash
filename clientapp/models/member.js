/*
This represents a Member on a team.
*/
var Backbone = require('backbone'),
    _ = require('underscore');


// our main member model. This represents a team member on the team.
module.exports = Backbone.Model.extend({
    defaults: {
        shippedCount: 0,
        damagingCount: 0,
        character: {name:"?", spec: "?", level: "?"}
    },
    // backbone calls "initialize" after calling a model's constructor
    initialize: function () {
        // so here, any time our activeTask changes, we want to update it
        // on our member model.
        this.on('change:activeTask', this.handleActiveTaskChange, this);
        // since we don't have a "change" event when the app first
        // loads we'll also manually call the update function once.
        this.handleActiveTaskChange();

        this.on('create:task', this.handleDamagingTaskChange, this);
        this.handleDamagingTaskChange();

        this.on('update:member', this.handleCharacterUpdate, this);
        this.handleCharacterUpdate();
    },
    // This simply looks up the active task attribute,
    // if it has one, goes and fetchs the task from the
    // API and set the resulting title as "activeTaskTitle"
    handleActiveTaskChange: function (model, val) {
        var self = this,
            activeTaskId = this.get('activeTask') || '';

        if (activeTaskId === '') {
            self.set('activeTaskTitle', '');
        } else {
            app.api.getTask(app.team.id, activeTaskId, function (err, task) {
                if (task) self.set('activeTaskTitle', task.title);
            });
        }
    },
    // convenience method since we're likely to want this more than one place
    fullName: function () {
        return this.get('firstName') + ' ' + this.get('lastName');
    },
    // we can derive the pic URL from the ids
    picUrl: function () {
        return 'https://api.andbang.com/teams/' + app.team.id + '/members/' + this.id + '/image';
    },
    handleDamagingTaskChange: function () {
        this.damagingCount = app.team.damagingTasks.length;
    },
    handleCharacterUpdate: function() {
        this.character = this.defaults.character;
        var self = this;
        $.ajax({
            url: 'http://localhost:5984/bangladash/member-'+self.id,
            type: "get",
            dataType: "jsonp",
            error: function (xhr, status, error) {
                console.log(error);
            },
            success: function (data, status, xhr) {
                var character = {name: data.name, level: data.level, spec: data.spec};
                self.set('character', character);
                app.team.members._byId[self.id].character = character;
            }
        });
    }
});
