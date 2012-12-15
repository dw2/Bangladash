/*
This main view view is responsible for rendering all content that goes into the
<body>. It's initted right away and renders iteslf on DOM ready.
*/

/*global nm*/
var BaseView = require('views/base'),
    _ = require('underscore'),
    templates = require('templates'),
    MemberView = require('views/member');
    ChatView = require('views/chat');


module.exports = BaseView.extend({
    events: {
        "keypress #chat textarea": "submitNewMessage",
        "click menu .settings": "displaySettingsModal",
        "click menu .attacks": "displayAttacksModal"
    },
    initialize: function () {
        // when members are reset we want to redraw them all
        this.model.members.on('add', this.handleNewMember, this);
        this.model.members.on('reset', this.handleMembersReset, this);

        // when members are reset we want to redraw them all
        this.model.chats.on('add', this.handleNewChat, this);
        this.model.chats.on('reset', this.handleChatsReset, this);

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
    handleChatsReset: function () {
        // create and append a view for each member
        this.model.chats.each(this.handleNewChat, this);
    },
    handleNewChat: function (chat) {
        if (!chat.attributes) return;

        var chatContainer = this.$('.chat'),
            view = new ChatView({ model: chat }),
            r = view.render();
        if (r) chatContainer.append(r.el);
    },
    handleMembersReset: function () {
        // create and append a view for each member
        this.model.members.each(this.handleNewMember, this);
    },
    handleNewMember: function (member) {
        var peopleContainer = this.$('.people'),
            view = new MemberView({model: member});

        peopleContainer.append(view.render().el);
    },
    submitNewMessage: function(e) {
        var keyCode = e.which || e.keyCode;
        if (keyCode == 13) {
            var $textarea = $(e.target),
                message = $textarea.val();
            app.api.sendChat(app.team.id, message, function(err, chat) {
                if (chat && $textarea.val() == message) $textarea.val('');
            });
            return false;
        }
    },
    displaySettingsModal: function () {
        var me = _.find(app.team.members.models, function (member) { return member.attributes.me == true; }),
            html = '<label for="character_name">Adventurer Name</label>' +
            '<input id="character_name" type="text" value="' + me.character.name + '">' +
            '<label for="character_spec">Class</label>' +
            '<select id="character_spec">',
            specs = ['Fighter', 'Wizard', 'Cleric', 'Ranger'];
        _.each(specs, function(spec) {
            html += '<option value="' + spec + '"' + (me.character.spec == spec ? ' selected="selected"' : '') + '>' + spec + '</option>';
        });
        html += '</select><label for="character_level">Level</label><select id="character_level">';
        for (var _i = 1; _i <= 30; _i++) {
            html += '<option value="' + _i + '"' + (me.character.level == _i ? ' selected="selected"' : '') + '>' + _i + '</option>';
        }
        html += '</select>';

        var modal = new Skylite({
            title: 'Character Sheet',
            body: html,
            type: 'settings',
            actions: {
                cancel: function() {},
                save: function() {
                    console.log('herp');
                }
            }
        });
    },
    displayAttacksModal: function () {
        console.log('something');
    }
});
