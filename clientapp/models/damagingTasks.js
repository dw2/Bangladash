/*
Damaging Tasks

The collection that contains our task objects that cause damage
*/
var Backbone = require('backbone'),
    _ = require('underscore'),
    Task = require('models/task');


module.exports = Backbone.Collection.extend({
    model: Task,
    fetch: function () {
        var self = this;
        app.api.getAllTasks(app.team.id, function (err, tasks) {
            _.each((tasks || []).reverse(), function (task) {
                var now = Date.create(),
                    createdDate = Date.create(Number(task.created)),
                    twentyFourHoursAgo = Date.create('24 hours ago');
                if (createdDate.isAfter(twentyFourHoursAgo)) {
                    self.add(task);
                }
            });
        });
    }
});
