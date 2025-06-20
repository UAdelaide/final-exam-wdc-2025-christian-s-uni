const { createApp } = Vue;

createApp({
    data() {
        return {
            dogName: "",
            dogOwner: "",
            dogImage: ""
        };
    },
    async mounted() {
        var fetchedDogImg = await fetch("https://dog.ceo/api/breeds/image/random");
        dogImgObject = await fetchedDogImg.json();
        this.dogImage = dogImgObject.mes
    }
}).mount('#app');