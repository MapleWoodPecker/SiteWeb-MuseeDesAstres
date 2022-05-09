function getcart (){
  var headers = {"Content-Type": "application/json","Access-Control-Origin": "*", "Expires": ""}
  var data = [];
for (let i = 0; i < sessionStorage.length; i++) {
    data[i] = sessionStorage.getItem(i);
};
          
          console.debug(" data : "+ data);
          console.debug("data Json : " + JSON.stringify((Object.assign({}, data))));

          fetch("/cart", {
            method: "POST",
            headers: headers,
            body:  JSON.stringify((Object.assign({}, data)))
          })

          .then(response => response.json())
          .then(data => {
            //create main cart node
            let racine = document.createElement('div');
            racine.classList.add('col-md-5', 'col-lg-4', 'order-md-last');

            //create header cart node
            let cartHeader = document.createElement('h4');
            cartHeader.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-3');

            //create header title cart node
            let cartTitre = document.createElement('span');
            cartTitre.classList.add('text-primary');
            cartTitre.innerText= "Votre Panier";

            //create header items cart node
            let nbitems = document.createElement('span');
            nbitems.classList.add('badge', 'bg-primary', 'rounded-pill');
            nbitems.innerText = data.length;

            //create list Items cart node
            let listItems = document.createElement('ul');
            listItems.classList('list-group','mb-3');
            
            let prixTotHT = 0;
           
            for (const Items of data) {
              
              prixTotHT= prixTotHT+Items.prix;

              let listItem = document.createElement('li');
              
              listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

              let indiv = document.createElement('div');

              let Titre = document.createElement('h6');
              Titre.classList.add('my-0');
              Titre.innerText = Items.titre;

              let Descrip = document.createElement('small');
              Descrip.classList.add('text-muted');
              Descrip.innerText = Items.desc;

              let Prix = document.createElement('span');
              Prix.classList.add('text-muted');
              Prix.innerText = "$ " +Items.prix;

              indiv.appendChild(Titre);
              indiv.appendChild(Descrip);

              listItem.appendChild(indiv);
              listItem.appendChild(Prix);
              
              listItems.appendChild(listItem);
            }
            let total = document.createElement('li');
            total.classList.add('list-group-item', 'd-flex', 'justify-content-between');

            let textTotal = document.createElement('span');
            textTotal.innerText = "Total (CAD)";

            let prixTotal = document.createElement('strong');
            prixTotal.innerText = "$ "+prixTotHT;
            console.debug(prixTotHT);

            total.appendChild(textTotal);
            total.appendChild(prixTotal);

            console.debug(total.innerHTML);
            listItems.appendChild(total);

            cartHeader.appendChild(cartTitre);
            cartHeader.appendChild(nbitems);

            racine.appendChild(cartHeader);
            racine.appendChild(listItems);
            
            let all = createElement('div')
            all.appendChild(racine);
            return all.innerHTML;
          })
          .catch(console.error);
}

