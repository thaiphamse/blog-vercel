class ImageUpload {
    constructor(quill, options = {}) {
        this.quill = quill;
        this.options = options;
        this.uploadPreset = this.options.uploadPreset;
        this.uploadUrl = this.options.uploadUrl; 5
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
                alert('You could only upload images.')
            }
        };
    }
    showToastNotify(file) {
        alert(`Đang tải lên: ${file?.name} (${file.size}byte)`)
    }
    uploadToCloudinary(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.uploadPreset); // Replace with your Cloudinary upload preset
        this.showToastNotify(file)
        // { name: "640x480.jpg", lastModified: 1719911688000, webkitRelativePath: "", size: 744777, type: "image/jpeg" }

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
                alert('Error uploading image:', error)
            });
    }
    insertToEditor(url) {
        const range = this.quill.getSelection();
        this.quill.insertEmbed(range.index, 'image', url);
    }
}