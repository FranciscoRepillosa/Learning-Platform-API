const render= (template, props) => {
    return (req, res, next) => {  
        props = props ? props : {}   
        res.render(template, props)
    }
  }

  module.exports = render;