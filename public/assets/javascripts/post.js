document.addEventListener("DOMContentLoaded", function () {

    console.log("Dom loaded");

    quill = new Quill(".editor", {
        theme: "snow",
        modules: {
            toolbar: null
        },
        readOnly: true
    });

});