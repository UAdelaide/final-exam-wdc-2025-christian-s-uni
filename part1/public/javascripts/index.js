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
        this. = await fetch("https://dog.ceo/api/breeds/image/random");

    }
})