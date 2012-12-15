/*
Member View

Responsible for rendering the member 'cards' for each
team member.

*/
var BaseView = require('views/base'),
    _ = require('underscore'),
    templates = require('templates');


module.exports = BaseView.extend({
    render: function () {
        // Here we replace the default 'el'.
        this.setElement(templates.message({
            message: this.model,
            member: app.team.members._byId[this.model.attributes.from]
        }));
        // This is what makes the declaritive bindings above
        // actually work. We're just calling a method on the
        // base view that set up the various handlers necessary
        // to maintain the bindings while this view is still
        // in existence.
        this.handleBindings();
        this.model.on('remove', this.destroy, this);

        return this;
    },
    destroy: function () {
        this.model.off();
        this.remove();
    }
});
