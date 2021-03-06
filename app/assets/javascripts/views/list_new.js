TrelloClone.Views.ListNew = Backbone.View.extend({
	template: JST['lists/new'],

	events: {
		"submit form": "createList"
	},

	createList: function (event) {
		event.preventDefault();
		var formJSON = $(event.currentTarget).serializeJSON();
		var newList = new TrelloClone.Models.List(formJSON.list);

		newList.set({
			board_id: this.collection.board.id,
			ord: this.collection.length
		});
		
		newList.save({}, {
			success: function () {
				this.collection.add(newList);
				this.$el.find('input').val('');
			}.bind(this)
		});
	},

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	}
})