Quill.register("modules/imageUploader", ImageUploader);
let quill
document.addEventListener("DOMContentLoaded", function () {
    const fullToolbarOptions = [
        [{ 'align': [] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ["link", "image"],
    ];

    console.log("Dom loaded");

    quill = new Quill("#editor", {
        theme: "snow",
        modules: {
            toolbar: {
                container: fullToolbarOptions
            },

            imageUploader: {
                upload: (file) => {
                    return new Promise((resolve, reject) => {
                        const formData = new FormData();
                        formData.append("image", file);

                        fetch(
                            "",
                            {
                                method: "POST",
                                body: formData
                            }
                        )
                            .then((response) => response.json())
                            .then((result) => {
                                console.log(result);
                                resolve(result.data.url);
                            })
                            .catch((error) => {
                                reject("Upload failed");
                                console.error("Error:", error);
                            });
                    });
                }
            }
        }
    });

    const contentForm = document.getElementById('content-form')
    const saveContentBtn = document.querySelector('.save-content-btn')
    const contentDelta = document.getElementById('contentDelta')
    saveContentBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const delta = quill.getContents()
        contentDelta.value = JSON.stringify(delta.ops);
        contentForm.submit()
    })
});