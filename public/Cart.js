var headers = {"Content-Type": "application/json","Access-Control-Origin": "*", "Expires": ""}

          var data = Object.keys(sessionStorage);
          console.log(data);

          fetch("/test", {
            method: "GET",
            headers: headers,
            body:  JSON.stringify(data)
          })
          .then(function(response){ 
            return response.json(); 
          })
          .then(function(data){ 
            console.log(data)
          });