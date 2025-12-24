document.getElementById('timeout-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const token = document.getElementById('token').value;
    const serverId = document.getElementById('server-id').value;
    const userIds = document.getElementById('user-ids').value.split('\n').map(id => id.trim()).filter(id => id !== '');

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    for (const userId of userIds) {
        try {
            const timeoutDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
            const response = await fetch(`https://discord.com/api/v9/guilds/${serverId}/members/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ communication_disabled_until: timeoutDate })
            });

            if (response.ok) {
                resultDiv.innerHTML += `Successfully timed out user ID ${userId} until ${timeoutDate}<br>`;
            } else {
                const errorData = await response.json();
                resultDiv.innerHTML += `Failed to timeout user ID ${userId}: ${errorData.message}<br>`;
            }
        } catch (error) {
            resultDiv.innerHTML += `Error timing out user ID ${userId}: ${error.message}<br>`;
        }

      
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
});
