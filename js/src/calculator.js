(function() {

  Backbone.CalculatorView = Backbone.View.extend({
    template: _.template(`
      <form class="backform"></form>
      <table class="table table-condensed"></table>
    `),
    resultTemplate: _.template(`
      <tbody>
        <tr>
          <td class="text-right">Credit card fee</td>
          <th class="text-left"><%=result.discount%> $</th>
        </tr>
        <tr>
          <td class="text-right">Service fee</td>
          <th class="text-left"><%=result.service%> $</th>
        </tr>
        <tr>
          <td class="text-right">Transaction fee</td>
          <th class="text-left"><%=result.transaction%> $</th>
        </tr>
        <tr>
          <td class="text-right">Taxes (on fees)</td>
          <th class="text-left"><%=result.taxes%> $</th>
        </tr>
        <tr>
          <td class="text-right"><h3>Amount<br/><small>after fees</small></h3></td>
          <th class="text-left"><h3><strong><%=result.amount%> $</strong></h3></th>
        </tr>
      </tbody>
    `),
    events: {
      'submit form': function(e) {e.preventDefault();}
    },
    initialize: function(options) {
      this.listenTo(this.model, 'change', this.renderResult);
    },
    render: function() {
      this.$el.html(this.template(this.model.pick('amount')));

      new Backform.Form({
        el: this.$('form'),
        model: this.model,
        className: '',
        fields: [{
          name: 'amount',
          label: 'Amount charged to customer ($)',
          control: 'input',
          type: 'number'
        }]
      }).render();
      this.$('form .form-group').addClass('form-group-lg');

      this.$result = this.$('table');
      this.renderResult();

      return this;
    },
    renderResult: function() {
      var data = this.model.toRender();
      this.$result.html(this.resultTemplate(data));
      return this;
    }
  });

}.call(this));