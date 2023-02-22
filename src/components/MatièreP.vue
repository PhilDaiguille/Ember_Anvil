<script>

    let MatièreP = ["fer","charbon","bronze","cuivre","étain"]
    
    let affiche = document.querySelector("main section")
    
    function test(){
        for(let i = 0; i < MatièreP.length; i++){
        return `<h2>${MatièreP[i]}</h2>`;
    }

    }
    test()
   
</script>