$(document).ready(function() {

  // UI setup
  _.extend(Backform, {
    controlLabelClassName: 'control-label',
    controlsClassName: ''
  });
  if (window.navigator.standalone) $('body').addClass('standalone');


  // Data model and persistence to local storage
  var defaults = undefined;
  try {
    defaults = JSON.parse(localStorage.amiliaFeeCalculatorSettings);
  } catch(error) {

  }
  var model = new Backbone.CalculatorModel(defaults);
  model.on('change', function() {
    localStorage.amiliaFeeCalculatorSettings = JSON.stringify(model.toJSON());
  });


  // The two views
  new Backbone.CalculatorView({
    el: $('#calculator'),
    model: model
  }).render();

  new Backbone.ConfigurationView({
    el: $('#configuration'),
    model: model
  }).render();

});