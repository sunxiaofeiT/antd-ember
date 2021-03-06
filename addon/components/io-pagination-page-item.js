import Ember from 'ember';

var computed = Ember.computed;

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'io-pagination-item',
  classNameBindings: ['isActive', 'disabled'],
  seperator: '…',
  selected: null,

  url: computed('urlTemplate', 'page', function () {
    var urlTemplate = this.get('urlTemplate');
    var current = this.get('page');

    urlTemplate = urlTemplate.replace('{current}', current);

    return urlTemplate;
  }),

  isActive: computed('page', 'selected', function () {
    if(this.get('page') === this.get('selected')) {
      return 'io-pagination-item-active';
    } else {
      return '';
    }
  }),

  isDots: computed('page', function () {
    var seperator = this.get('seperator');
    var page = this.get('page');

    return page === seperator;
  }),

  actions: {
    select: function () {
      var last = this.get('selected');
      var page = this.get('page');

      if (page !== last) {
        this.sendAction('pageSet', page, last);
      }
    }
  }
});