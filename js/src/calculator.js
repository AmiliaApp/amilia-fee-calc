(function() {

  Backbone.CalculatorView = Backbone.View.extend({
    template: _.template(`
      <form>
        <div class="form-group">
          <label for="calculator-amount">Amount charged to customer $</label>
          <input name="amount" type="number" class="form-control" id="calculator-amount" value="<%=amount%>" />
        </div>
      </form>
      <table class="table"></table>
    `),
    tableTemplate: _.template(`
      <tbody>
        <tr>
          <td class="text-right">PaySafe</td>
          <th class="text-left"><%=result.discount%> $</th>
        </tr>
        <tr>
          <td class="text-right">Amilia</td>
          <th class="text-left"><%=result.amilia%> $</th>
        </tr>
        <tr>
          <td class="text-right">Transaction</td>
          <th class="text-left"><%=result.transaction%> $</th>
        </tr>
        <tr>
          <td class="text-right">Taxes</td>
          <th class="text-left"><%=result.taxes%> $</th>
        </tr>
        <tr>
          <td class="text-right"><h4>Amount</h4></td>
          <th class="text-left"><h4><strong><%=result.amount%> $</strong></h4></th>
        </tr>
      </tbody>
    `),
    events: {
      'submit form': 'onSubmitForm'
    },
    initialize: function(options) {
      this.listenTo(this.model, 'change', this.renderTable);
    },
    onSubmitForm: function(e) {
      e.preventDefault();
      this.model.set({amount: parseFloat(this.$amount.val(), 10)});
      return false;
    },
    render: function() {
      this.$el.html(this.template(this.model.pick('amount')));
      this.$amount = this.$('form input[name=amount]');
      this.$table = this.$('table');
      return this.renderTable();
    },
    renderTable: function() {
      var data = this.model.toRender();
      this.$table.html(this.tableTemplate(data));
      return this;
    }
  });

}.call(this));