(function() {

  Backbone.CalculatorModel = Backbone.Model.extend({
    defaults: {
      discount: 0.0275,
      amilia: 0.0125,
      transaction: 0.30,
      taxes: 0.15,
      amount: 215
    },
    // toJSON + these attributes:
    // - result: calculation result
    // - errors: list of errors (if any) as a hash of attr: msg
    toRender: function() {
      var data = this.toJSON();
      data.errors = [];
      data.result = undefined;
      if (!_.isNumber(data.discount))
        data.errors.push({attr: 'discount', error: 'Invalid PaySafe discount fee: ' + data.discount + '. Must be a number.'});
      if (!_.isNumber(data.amilia))
        data.errors.push({attr: 'amilia', error: 'Invalid Amilia service fee: ' + data.amilia + '. Must be a number.'});
      if (!_.isNumber(data.transaction))
        data.errors.push({attr: 'transaction', error: 'Invalid Transaction fee: ' + data.transaction + '. Must be a number.'});
      if (!_.isNumber(data.taxes))
        data.errors.push({attr: 'taxes', error: 'Invalid Taxes fee: ' + data.taxes + '. Must be a number.'});
      if (!_.isNumber(data.amount))
        data.errors.push({attr: 'amount', error: 'Invalid Amount: ' + data.amount + '. Must be a number.'});

      if (data.errors.length == 0) {
        var fees = data.amount * data.discount + data.amount * data.amilia + data.transaction;
        data.result = data.amount - fees - fees * data.taxes;
      }
      return data;
    }
  });

}.call(this));