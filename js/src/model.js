(function() {

  Backbone.CalculatorModel = Backbone.Model.extend({
    defaults: {
      discount: 2.75,
      service: 1.25,
      transaction: 0.30,
      taxes: 15,
      amount: 215
    },
    // Returns a hash of errors (if any)
    validate: function(data) {
      data || (data = this.toJSON());
      var errors = {};
      _.each(['discount', 'service', 'transaction', 'taxes', 'amount'], function(attr) {
        if (!_.isNumber(data[attr])) errors[attr] = 'Invalid value "' + data[attr] + '". Must be a number.';
      });
      return errors;
    },
    // Returns an object of calculated results
    calculate: function(data) {
      data || (data = this.toJSON());
      var result = {
        discount: undefined,
        service: undefined,
        transaction: undefined,
        taxes: undefined,
        amount: undefined
      };
      
      var errors = data.errors || (this.validate(data));
      if (errors.length) return result;

      var fees = data.amount * data.discount/100 + data.amount * data.service/100 + data.transaction;
      result.amount = Math.round(100 * (data.amount - fees - fees * data.taxes/100))/100;
      result.discount = Math.round(100 * data.discount/100 * data.amount)/100;
      result.service = Math.round(100 * data.service/100 * data.amount)/100;
      result.transaction = data.transaction;
      result.taxes = Math.round(100 * fees * data.taxes/100)/100;

      return result;
    },
    toRender: function() {
      var data = this.toJSON();
      data.errors = this.validate(data);
      data.result = this.calculate(data);
      return data;
    }
  });

}.call(this));