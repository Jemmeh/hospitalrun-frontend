import { translationMacro as t } from 'ember-i18n';
import AbstractModuleRoute from 'hospitalrun/routes/abstract-module-route';
import Ember from 'ember';
export default AbstractModuleRoute.extend({
  addCapability: 'add_medication',
  moduleName: 'medication',
  newButtonText: t('medication.buttons.new_button'),
  sectionTitle: t('medication.section_title'),

  additionalButtons: function() {
    let i18n = this.get('i18n');
    var additionalButtons = [];
    if (this.currentUserCan('fulfill_medication')) {
      additionalButtons.push({
        buttonIcon: 'octicon octicon-checklist',
        buttonAction: 'dispenseMedication',
        buttonText: i18n.t('medication.buttons.dispense_medication'),
        class: 'btn btn-primary'
      });
    }
    if (this.currentUserCan(this.get('addCapability'))) {
      additionalButtons.push({
        buttonIcon: 'octicon octicon-mail-reply',
        buttonAction: 'returnMedication',
        buttonText: i18n.t('medication.buttons.return_medication'),
        class: 'btn btn-primary'
      });
    }
    if (!Ember.isEmpty(additionalButtons)) {
      return additionalButtons;
    }
  }.property(),

  additionalModels: [{
    name: 'aisleLocationList',
    findArgs: ['lookup', 'aisle_location_list']
  }, {
    name: 'expenseAccountList',
    findArgs: ['lookup', 'expense_account_list']
  }, {
    name: 'sexList',
    findArgs: ['lookup', 'sex']
  }, {
    name: 'warehouseList',
    findArgs: ['lookup', 'warehouse_list']
  }],

  subActions: function() {
    let i18n = this.get('i18n');
    return [{
      text: i18n.t('labels.requests'),
      linkTo: 'medication.index'
    }, {
      text: i18n.t('labels.completed'),
      linkTo: 'medication.completed'
    }];
  }.property(),

  actions: {
    dispenseMedication: function() {
      if (this.currentUserCan('fulfill_medication')) {
        this.transitionTo('medication.edit', 'dispense');
      }
    },

    returnMedication: function() {
      if (this.currentUserCan(this.get('addCapability'))) {
        this.transitionTo('medication.return', 'new');
      }
    }
  }
});
