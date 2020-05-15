const exphbs = require('express-handlebars')

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

module.exports = {
  hbsHelpers: {
    getDay: (value) => {
      return weekdays[value - 1]
    },
    truncTime: (value) => {
      return value.slice(0, 5)
    },
  },
}
