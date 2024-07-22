const classLoading = [
    'submit', 'loading',
]
classLoading.forEach(className => {
    let button = document.querySelectorAll(`.${className}`)
    if (!button) return
    button.forEach(item => {
        item.addEventListener('click', function () {
            // Hiển thị spinner
            var spinner = document.getElementById('spinner-overlay');
            console.log(spinner);
            spinner.style = 'display: flex !important;';

        });
    })

});

// Đảm bảo rằng overlay được ẩn khi trang được tải lại hoặc khi người dùng quay lại trang
window.addEventListener('pageshow', function () {
    var overlay = document.getElementById('spinner-overlay');
    overlay.style.display = 'none';
});

