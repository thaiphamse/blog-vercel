
const handlebars = require('express-handlebars')
const moment = require('moment');
const path = require('path');
module.exports = (app) => {
  // set locale for moment
  moment.locale('vi');
  app.engine('.hbs', handlebars.engine({
    // change handlebars extension to .hbs
    extname: '.hbs',
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true
    },
    // declare helpers
    helpers: {
      momentDay: function (date) {
        return moment(date).format("L");
      },
      momentTime: function (date) {
        return moment(date).format("LLL");
      },
      momentTimeShort: function (date) {
        return moment(date).format("LT");
      },
      momentRelative: function (timestamps) {
        return moment(timestamps, "YYYYMMDD").fromNow();
      },
      momentDateShort: function (date) {
        return moment(date).format("l")
      },
      momentDateTimeInput: function (date) {
        return moment(date).format("YYYY-MM-DDTHH:mm");
      },
      ifEquals: function (arg1, arg2) {
        //convert to string to compare
        arg1 = arg1?.toString();
        arg2 = arg2?.toString();
        return (arg1?.toUpperCase().trim() === arg2?.toUpperCase().trim());
      },
      indexing: function (index) {
        return index + 1
      },
      json: function (context) {
        return JSON.stringify(context);
      },
      vndFormat: function (amount) {
        var parts = parseFloat(amount).toFixed(2).toString().split('.');
        var integerPart = parts[0];

        // Tạo mảng các ký tự từ phần nguyên
        var integerArray = integerPart.split('').reverse();
        var formattedInteger = '';

        // Thêm dấu chấm phân cách hàng nghìn
        for (var i = 0; i < integerArray.length; i++) {
          if (i % 3 === 0 && i !== 0) {
            formattedInteger += '.';
          }
          formattedInteger += integerArray[i];
        }

        // Đảo ngược lại chuỗi phần nguyên để có định dạng đúng
        formattedInteger = formattedInteger.split('').reverse().join('');

        // Trả về chuỗi đã chuẩn hoá
        return formattedInteger + ' VND';
      },

      stripHtml: function (content) {
        return content.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
      }
      ,
      equalsZero: function (number) {
        let formatumber = parseInt(number);
        return formatumber == 0;
      },
      upperZero: function (number) {
        let formatumber = parseInt(number);
        return formatumber > 0;
      },
      lowerZero: function (number) {
        let formatumber = parseInt(number);
        return formatumber < 0;
      },
      toUpperCase: function (string) {
        return string.toString().toUpperCase();
      },
    }
  }));
  // config view engine and path to views
  app.set('view engine', '.hbs');
  app.set('views', path.join(__dirname, '../../', '/public/views'));
}
