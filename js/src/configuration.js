(function() {

  Backbone.ConfigurationView = Backbone.View.extend({
    template: _.template(`
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="config-heading">
          <h4 class="panel-title">
            <a role="button" data-toggle="collapse" href="#config" aria-expanded="true" aria-controls="config">
              Config : 2.75% + 1.25% + 0.30
            </a>
          </h4>
        </div>
        <div id="config" class="panel-collapse collapse" role="tabpanel" aria-labelledby="config-heading">
          <div class="panel-body">
            <form>
              <div class="form-group">
                <label for="discount-fee">PaySafe discount fee %</label>
                <input type="numeric" class="form-control" id="discount-fee" value="2.75" />
              </div>
              <div class="form-group">
                <label for="amilia-fee">Amilia service fee %</label>
                <input type="numeric" class="form-control" id="amilia-fee" value="1.25" />
              </div>
              <div class="form-group">
                <label for="transaction-fee">Transaction fee $</label>
                <input type="numeric" class="form-control" id="transaction-fee" value="0.30" />
              </div>
              <div class="form-group">
                <label for="taxes-fee">Taxes on fees %</label>
                <input type="numeric" class="form-control" id="taxes-fee" value="15" />
              </div>
            </form>
          </div>
        </div>
      </div>
    `),
    render: function() {
      var data = this.model.toJSON();
      this.$el.html(this.template(data));
    }
  });

}.call(this));