/*
This main view view is responsible for rendering all content that goes into the
<body>. It's initted right away and renders iteslf on DOM ready.
*/

/*global nm*/
var BaseView = require('views/base'),
    _ = require('underscore'),
    templates = require('templates'),
    MemberView = require('views/member');
    
    
module.exports = BaseView.extend({
    initialize: function () {
        // when members are reset we want to redraw them all
        this.model.members.on('add', this.handleNewMember, this);
        this.model.members.on('reset', this.handleMembersReset, this);
        
        // because the data is handled seperately we can just tell this main 
        // app view to render itself when the DOM is ready.
        // This is just a shortcut for doing $(document).ready();
        $(_.bind(this.render, this));
    },
    render: function () {
        // we set the body element as the root element in this view.
        this.setElement($('body')[0]);
        // render our app template into the body
        this.$el.html(templates.app());
    },
    handleMembersReset: function () {
        // create and append a view for each member
        this.model.members.each(this.handleNewMember, this);
    },
    handleNewMember: function (member) {
        var peopleContainer = this.$('.people'),
            view = new MemberView({model: member});
        
        peopleContainer.append(view.render().el);
    }
});