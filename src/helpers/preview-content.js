import erb from 'erb'
import Handlebars from 'handlebars'

Handlebars.registerHelper('equals', function (lhs, rhs, options) {
  if (lhs === rhs) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

export const compile = async ({ raw, engine, variables = {} }) => {
  if (engine === 'erb') {
    const res = await erb({
      timeout: 5000,
      data: { values: variables },
      template: raw,
    })

    return res
  }
  if (engine === 'handlebars') {
    const res = Handlebars.compile(raw)(variables)
    return res
  }

  return raw
}
