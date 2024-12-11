async function createFeedback() {
    console.log('Creating Feedback')
    await fetch('https://inst-377-project-zeta.vercel.app/add', {
        method: 'POST',
        body: JSON.stringify({
            name: `${document.getElementById('name').value}`,
            feedback: `${document.getElementById('feedback').value}`
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    }) .then((res) => res.json());
}