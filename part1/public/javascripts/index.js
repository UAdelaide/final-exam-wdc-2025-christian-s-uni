const { createApp } = Vue;

createApp({
    data() {
        return {
            dogName: "Ralph",
            dogOwner: "Alice",
            dogImage: ""
        };
    },
    async mounted() {
        var fetchedDogImg = await fetch("https://dog.ceo/api/breeds/image/random");
        var dogImgObject = await fetchedDogImg.json();
        this.dogImage = dogImgObject.message;
    },
    async 

}).mount('#app');