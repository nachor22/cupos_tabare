// Attach a submit handler to the form
    $( "#login" ).submit(function( event ) {
     
      // Stop form from submitting normally
      event.preventDefault();
      var $form = $( this ),
        email = $('#email').val(),
        pass= $('#password').val(),
        req_json = '{"user":"'+ email +'","password":"' + pass + '"}'
        url_api = "https://api-agenda.clubtabare.com.uy"
     
        request = $.ajax( {method: "PUT", url: url_api+"/signin", data: req_json, contentType:"application/json" });
        request.done(function( msg ) {
          token = msg.token;
          console.log (token);
          request_get = $.ajax( {method: "GET", url: url_api+"/activitytime/?id=4&dow=4&userId=1800", headers: {"authorization": "Bearer "+ token}, contentType:"application/json" });
          request_get.done(function( msg2 ) {
            $.each(msg2.description, function(index) {
              if (msg2.description[index].name == "Tenis Avanzado"){
                var desc = msg2.description[index].name
                var time = msg2.description[index].starttime
                var num_res = msg2.description[index].TotalReservations
                $("#header").text(desc);
                $("#list").append('<li class="collection-item">'+ time + ' - Anotados: ' + num_res + '</li>');
              }
            });
          });
        });
    });
