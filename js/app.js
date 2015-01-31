var Todo = Backbone.Model.extend({});

// or with some arbitrary data:
var Initiate = new Todo({
    title: 'Check the attributes of both model instances in the console.',
    completed: true
});

// Following logs: {"title":"Check the attributes of both model instances in the console.","completed":true}
console.log(JSON.stringify(Initiate));