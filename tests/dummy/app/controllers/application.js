import Ember from 'ember';

export default Ember.Controller.extend({
  isAuthenticated: Ember.computed('session.id', function() {
    return Ember.isPresent(this.get('session.id'));
  })
});
