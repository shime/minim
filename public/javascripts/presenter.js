var riot = require('riotjs'),
    marked = require('marked'),
    highlighter = require('highlight.js')

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  highlight: function (code) {
    return highlighter.highlightAuto(code).value;
  }
})

function presenter(element, options){
  element = $(element)
  var template = options.template,
      model = options.model,
      result = $('.right'),
      that = this
  
  model.on("change", rerender)

  element.on('keyup', function(){
    model.change(this.value)
    if (!that.typed){
      that.typed = true
      $.ajax('/entry', {
        type: "POST"
      }).then(function(data){
        history.pushState({}, '', '/' + data.id)
      })
    }
  })

  function rerender(){
    var data = {
      text: marked(model.value)
    }
    result.html(riot.render(template, data))
  }
}

module.exports = presenter;
