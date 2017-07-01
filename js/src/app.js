$(document).ready(function() {

  // UI setup
  _.extend(Backform, {
    controlLabelClassName: 'control-label',
    controlsClassName: 'control-group'
  });
  if (window.navigator.standalone) $('body').addClass('standalone');


  // Data model and persistence to local storage
  var defaults = undefined;
  try {
    defaults = JSON.parse(localStorage.amiliaFeeCalculatorSettings);
  } catch(error) {

  }
  window.model = new Backbone.CalculatorModel(defaults);
  model.errorModel = new Backbone.Model();
  model.on('change', function() {
    model.errorModel.clear();
    model.errorModel.set(model.validate());
    localStorage.amiliaFeeCalculatorSettings = JSON.stringify(model.toJSON());
  });


  // The two views
  window.calculatorView = new Backbone.CalculatorView({
    el: $('#calculator'),
    model: model
  }).render();

  window.configurationView = new Backbone.ConfigurationView({
    el: $('#configuration'),
    model: model
  }).render();

});