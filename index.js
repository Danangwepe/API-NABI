const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Endpoint untuk mengambil data dari data.json dengan query parameter
app.get('/info', (req, res) => {
    try {
        const rawData = fs.readFileSync('./data.json');
        const data = JSON.parse(rawData);

        // Mengecek apakah ada query parameter tertentu
        const { field } = req.query;

        if (field) {
            // Jika field yang diminta ada di data, kembalikan field tersebut
            if (data.hasOwnProperty(field)) {
                res.json({ [field]: data[field] });
            } else {
                res.status(404).json({ message: `Field '${field}' tidak ditemukan dalam data.` });
            }
        } else {
            // Jika tidak ada query parameter, kembalikan seluruh data
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data.' });
    }
});

app.get('/info/:id', (req, res) => {
    try {
        const rawData = fs.readFileSync('./data.json');
        const data = JSON.parse(rawData);

        // Mengambil id dari parameter URL
        const id = parseInt(req.params.id);

        // Memeriksa apakah id valid
        if (id >= 0 && id < data.length) {
            res.json(data[id]);
        } else {
            res.status(404).json({ message: `Data dengan ID '${id}' tidak ditemukan.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
