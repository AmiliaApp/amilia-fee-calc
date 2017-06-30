$(document).ready(function() {

  var model = new Backbone.CalculatorModel(),
      calculatorView = new Backbone.CalculatorView({
        el: $('#calculator'),
        model: model
      }).render(),
      configurationView = new Backbone.ConfigurationView({
        el: $('#configuration'),
        model: model
      }).render();
});