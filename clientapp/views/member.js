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
        setTimeout(function(){ $(window).trigger('resize'); }, 100);
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
        this.model.on('change:character', this.handleCharacterChange, this);

        // call them all once
        this.handleActiveTaskChange();
        this.handleShippedCountChange();
        this.handleDamagingCountChange();
        this.handleCharacterChange();

        return this;
    },
    handleActiveTaskChange: function () {
        this.$el[this.model.get('activeTask') ? 'addClass' : 'removeClass']('active');
        $member = $('#people .member[data-id="' + this.model.id + '"]');
        if ($member.length) {
            $member.find('.activeTask').addClass('new').delay(2000).removeClass('new');
        }
    },
    handleShippedCountChange: function () {
        var power = this.model.get('shippedCount') * 10,
            container = this.$('.attackPerc');
        if (power > 100) power = 100;
        var pixels = Math.round((100 - power) / 100 * 157) + 14;
        container.find('.label').empty().text(power + '%').css('top', pixels);
        container.find('.mask').css('height', pixels);
        this.renderBoss();
    },
    handleDamagingCountChange: function () {
        var container = this.$('.healthPerc'),
            damage = this.model.get('damagingCount') * 10;
        if (damage > 100) damage = 100;
        var health = 100 - damage;
        var pixels = Math.round(damage / 100 * 157) + 14;
        container.find('.label').empty().text(health + '%').css('top', pixels);
        container.find('.mask').css('height', pixels);
        this.renderBoss();
    },
    handleCharacterChange: function () {
        var character = this.model.get('character');
        this.$('.stats').empty().text(character.level + ' - ' + character.spec);
        this.$('h2').empty().text(character.name);
        this.$('.attackPerc').attr('class', 'attackPerc ' + character.spec.toLowerCase());
    },
    destroy: function () {
        this.model.off();
        this.remove();
    },
    renderBoss: function () {
        var container = $('#boss'),
            power = app.team.attributes.bossAttackPerc,
            damage = app.team.attributes.bossDamagePerc;
        if (power > 100) power = 100;
        if (damage > 100) damage = 100;
        var health = 100 - damage;
        var healthPixels = Math.round(damage / 100 * 157) + 14,
            powerPixels = Math.round((100-power) / 100 * 157) + 14,
            html = $(templates.boss({ healthPerc: health, attackPerc: power }));
        html.find('.healthPerc .label').empty().text(health + '%').css('top', healthPixels);
        html.find('.healthPerc .mask').css('height', healthPixels);
        html.find('.attackPerc .label').empty().text(power + '%').css('top', powerPixels);
        html.find('.attackPerc .mask').css('height', powerPixels);
        container.empty().html(html);
    }
});
