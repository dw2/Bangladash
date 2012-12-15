/*
Member View

Responsible for rendering the member 'cards' for each
team member.

*/
var BaseView = require('views/base'),
    _ = require('underscore'),
    templates = require('templates');


module.exports = BaseView.extend({
    // This bindings section handles binding the
    // content of the '.activeTask' node to whatever
    // the value is of 'activeTaskTitle'
    contentBindings: {
        activeTaskTitle: '.activeTask',
        healthPerc: '.healthPerc',
        attackPerc: '.attackPerc'
    },
    // Class bindings toggle a class. So, here we're
    // saying that the presence attribute should always
    // maintain a corresponding class that matches its
    // value on the dom element that matches the selector.
    // In this case, the selector is: '' so it'll just
    // maintain that class on "this.el"
    classBindings: {
        presence: ''
    },
    render: function () {
        // Here we replace the default 'el'.
        this.setElement(templates.member({member: this.model}));
        // This is what makes the declaritive bindings above
        // actually work. We're just calling a method on the
        // base view that set up the various handlers necessary
        // to maintain the bindings while this view is still
        // in existence.
        this.handleBindings();
        this.model.on('remove', this.destroy, this);
        this.model.on('change:activeTask', this.handleActiveTaskChange, this);
        this.model.on('change:shippedCount', this.handleShippedCountChange, this);
        this.model.on('change:damagingCount', this.handleDamagingCountChange, this);

        // call them all once
        this.handleActiveTaskChange();
        this.handleShippedCountChange();
        this.handleDamagingCountChange();

        return this;
    },
    handleActiveTaskChange: function () {
        this.$el[this.model.get('activeTask') ? 'addClass' : 'removeClass']('active');
    },
    handleShippedCountChange: function () {
        var i = this.model.get('shippedCount'),
            container = this.$('.attackPerc');
        container.empty().text(i);
    },
    handleDamagingCountChange: function () {
        var i = this.model.get('damagingCount'),
            container = this.$('.healthPerc');
        container.empty().text(i);
    },
    destroy: function () {
        this.model.off();
        this.remove();
    }
});