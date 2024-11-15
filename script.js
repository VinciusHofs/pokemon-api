async function inputData() {
    i=0
    valueFalse=Int8Array
    valueFalse1=Int8Array
    valueTrue=Int8Array
    while(i<3){ 
        randomNumber = Math.floor(Math.random()* 1025)+1;
        if(i==0){
            valueFalse=randomNumber;
        }else if(i==1){
            valueTrue=randomNumber;
        }
        else{
            valueFalse1=randomNumber;
        }
        i+=1
    }
    console.log(valueTrue);
    console.log(valueFalse);
    console.log(valueFalse1);
    getPokemons(valueTrue,valueFalse,valueFalse1)
}

async function getPokemons() {
    const url="https://pokeapi.co/api/v2/pokemon/";
    const endpointFalse = `${url}${valueFalse}`; 
    const endpointTrue = `${url}${valueTrue}`; 
    const endpointFalse1 = `${url}${valueFalse1}`; 
    try {
        const responseTrue=await fetch(endpointTrue);
        const responseFalse=await fetch(endpointFalse);
        const responseFalse1=await fetch(endpointFalse1);

        const dataTrue = await responseTrue.json();
        const dataFalse = await responseFalse.json();
        const dataFalse1 = await responseFalse1.json();
        console.log(dataTrue,dataFalse,dataFalse1)
        return dataTrue,dataFalse,dataFalse1;

    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}