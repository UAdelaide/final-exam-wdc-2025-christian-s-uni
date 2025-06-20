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
        var dogImg = await fetch("")
    }
})