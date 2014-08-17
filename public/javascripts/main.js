var marked = require('marked')
    riot = require('riotjs')
    highlighter = require('highlight.js')

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  highlight: function (code) {
    return highlighter.highlightAuto(code).value;
  }
})


function mainPresenter(element, options){
  element = $(element)
  var template = options.template,
      model = options.model,
      result = $('.right')
  
  model.on("change", rerender)

  element.on('keyup', '.left > textarea', function(){
    model.change(this.value)
  })

  function rerender(){
    var data = {
      text: marked(model.value)
    }
    result.html(riot.render(template, data))
  }
}

function Entry(){
  var self = riot.observable(this)
  self.change = function(value){
    self.value = value
    self.trigger('change')
  }
}

$(function(){
  var model = new Entry()

  mainPresenter($("body"), {
    template: $("#main-template").html(),
    model: model
  })

  $('textarea').focus()
})
