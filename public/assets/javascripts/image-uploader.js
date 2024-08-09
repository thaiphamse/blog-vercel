class ImageUpload {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.uploadPreset = this.options.uploadPreset;
        this.uploadUrl = this.options.uploadUrl;
        this.quill.getModule('toolbar').addHandler('image', this.selectLocalImage.bind(this));
    }

    selectLocalImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (/^image\//.test(file.type)) {
                this.uploadToCloudinary(file);
            } else {
                console.warn('You could only upload images.');
            }
        };
    }

    uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append('file', file);
        console.log(this.uploadPreset)
        formData.append('upload_preset', this.uploadPreset); // Replace with your Cloudinary upload preset

        fetch(this.uploadUrl, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.secure_url) {
                    this.insertToEditor(data.secure_url);
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
    }
    insertToEditor(url) {
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', url);
    }
}