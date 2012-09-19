var test = new Meteor.Collection('test');

if (Meteor.is_client) {

    Handlebars.registerHelper('select', function() {
        var s="<select>";
        test.find().forEach(function(doc){
            s+="<option>"+doc.name+"</option>";
        });
        return new Handlebars.SafeString(s+="</select>");
    });

    Template.tests.tests = function(){
        return test.find();
    }

  Template.hello.events = {
    'click input' : function () {
        $('select').hide().show();
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
          console.log("You pressed the button");
    }
  };
}

if (Meteor.is_server) {
  Meteor.startup(function () {
      if(test.find().count() == 0){
          var i = 10;
        while(i--){
            test.insert({name:"test"+i});
        }
      }
    // code to run on server at startup
  });
}
