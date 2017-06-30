(function() {

  Backbone.CalculatorView = Backbone.View.extend({
    template: _.template(`
      <form>
        <div class="form-group">
          <label for="calculator-amount">Amount charged to customer $</label>
          <input type="numeric" class="form-control" id="calculator-amount" value="<%=amount%>" />
        </div>
      </form>
      <table class="table">
        <tbody>
          <tr>
            <td class="text-right">PaySafe</td>
            <th class="text-left"><%=discount%> $</th>
          </tr>
          <tr>
            <td class="text-right">Amilia</td>
            <th class="text-left"><%=amilia%> $</th>
          </tr>
          <tr>
            <td class="text-right">Transaction</td>
            <th class="text-left"><%=transaction%> $</th>
          </tr>
          <tr>
            <td class="text-right">Taxes</td>
            <th class="text-left"><%=taxes%> $</th>
          </tr>
          <tr>
            <td class="text-right"><h4>Amount</h4></td>
            <th class="text-left"><h4><strong><%=result%> $</strong></h4></th>
          </tr>
        </tbody>
      </table>
    `),
    render: function() {
      var data = this.model.toRender();
      this.$el.html(this.template(data));
    }
  });

}.call(this));