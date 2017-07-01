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
            <form class="backform"></form>
          </div>
        </div>
      </div>
    `),
    titleTemplate: _.template(`
      Config: <%=discount%>% + <%=service%>% + <%=transaction%>$ <i class="fa fa-fw fa-chevron-<%=opened ? 'up' : 'down'%>"></i>
    `),
    events: {
      'submit form': function(e) {e.preventDefault();},
      'shown.bs.collapse .panel-collapse': 'renderTitle',
      'hidden.bs.collapse .panel-collapse': 'renderTitle'
    },
    initialize: function(options) {
      this.listenTo(this.model, 'change', this.renderTitle);
    },
    render: function() {
      var data = this.model.toJSON();
      this.$el.html(this.template(data));

      this.$title = this.$('.title');
      this.renderTitle();

      new Backform.Form({
      	el: this.$('form'),
      	model: this.model,
      	fields: [{
          name: 'discount',
          label: 'Credit card (discount) fee (%)',
          control: 'input',
          type: 'number'
      	}, {
          name: 'service',
          label: 'Service fee (%)',
          control: 'input',
          type: 'number'
        }, {
          name: 'transaction',
          label: 'Transaction fee ($)',
          control: 'input',
          type: 'number'
        }, {
          name: 'taxes',
          label: 'Taxes on fees (%)',
          control: 'input',
          type: 'number'
        }]
      }).render();

      return this;
    },
    renderTitle: function() {
      var data = this.model.toJSON();
      data.opened = this.$('.panel-collapse').hasClass('in');
      this.$title.html(this.titleTemplate(data));
      return this;
    }
  });

}.call(this));