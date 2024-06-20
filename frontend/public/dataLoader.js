self.addEventListener('message', async function(e) {
    const { apiUrl, totalCount, pageSize } = e.data;
    const totalPages = Math.ceil(totalCount / pageSize);

    for (let i = 0; i < totalPages; i++) {
        const startIndex = i * pageSize;
        const endIndex = startIndex + pageSize - 1;
        const url = `${apiUrl}?pageSize=${pageSize}&start=${startIndex}&end=${endIndex}`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const dataBatch = await response.json();
            self.postMessage({ data: dataBatch, startIndex, endIndex });
        } catch (error) {
            self.postMessage({ error: error.message, startIndex, endIndex });
        }
    }

    self.postMessage('allBatchesProcessed');
}, false);