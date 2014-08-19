var presenter = require('./presenter'),
    Entry = require('./entry')

$(function(){
  var model = new Entry()

  presenter($("textarea"), {
    template: $("#main-template").html(),
    model: model
  })

  $('textarea').focus()
})
