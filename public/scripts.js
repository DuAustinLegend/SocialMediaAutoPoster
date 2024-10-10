document.getElementById('text-post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = document.getElementById('post-text').value;

    const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    const data = await response.json();
    document.getElementById('response-message').innerText = data.message;
});

document.getElementById('image-upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', document.getElementById('image').files[0]);

    const response = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    document.getElementById('response-message').innerText = data.message;
});

document.getElementById('video-upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', document.getElementById('video').files[0]);

    const response = await fetch('/api/upload/video', {
        method: 'POST',
        body: formData,
    });
    const data = await response.json();
    document.getElementById('response-message').innerText = data.message;
});
