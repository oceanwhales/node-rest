
var getStudents = function (req, res) {
    // TODO replace by mongo
  var students =  [{
         name: "dutour",
         firstname: "alfred"
      }];
      
  res.send(students);
}



exports.getStudents = getStudents;