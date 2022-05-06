var headers = {"Content-Type": "application/json","Access-Control-Origin": "*", "Expires": ""}
 var data = [];
for (let i = 0; i < sessionStorage.length; i++) {
    data[i] = sessionStorage.getItem(i);
    alert(sessionStorage.getItem(i));
};
         
          console.log(data);

          fetch("/cart", {
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