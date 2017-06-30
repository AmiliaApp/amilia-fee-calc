(function() {

  Backbone.ConfigurationView = Backbone.View.extend({
    template: _.template(`
      <div class="panel panel-default">
        <div class="panel-heading" role="tab" id="config-heading">
          <h4 class="panel-title">
            <a class="title" role="button" data-toggle="collapse" href="#config" aria-expanded="true" aria-controls="config"></a>
          </h4>
        </div>
        <div id="config" class="panel-collapse collapse" role="tabpanel" aria-labelledby="config-heading">
          <div class="panel-body">
            <form></form>
          </div>
        </div>
      </div>
    `),
    titleTemplate: _.template(`
      Config: <%=discount*100%>% + <%=amilia*100%>% + <%=transaction%>$ <i class="fa fa-fw fa-chevron-down"></i>
    `),
    initialize: function(options) {
      this.listenTo(this.model, 'change', this.renderTitle);
    },
    render: function() {
      var data = this.model.toJSON();
      this.$el.html(this.template(data));

      this.$title = this.$('.title');
      this.renderTitle();

      this.$form = this.$('form');
      new Backform.Form({
      	el: this.$form,
      	model: this.model,
      	fields: [{
          name: 'discount',
          label: 'PaySafe discount fee %',
          control: 'input',
          type: 'number'
      	}, {
          name: 'amilia',
          label: 'Amilia service fee %',
          control: 'input',
          type: 'number'
        }, {
          name: 'transaction',
          label: 'Transaction fee $',
          control: 'input',
          type: 'number'
        }, {
          name: 'taxes',
          label: 'Taxes on fees %',
          control: 'input',
          type: 'number'
        }]
      }).render();

      return this;
    },
    renderTitle: function() {
      var data = this.model.toJSON();
      this.$title.html(this.titleTemplate(data));
      return this;
    }
  });

}.call(this));