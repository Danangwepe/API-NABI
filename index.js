const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Endpoint untuk mengambil data dari data.json dengan query parameter
app.get('/info', (req, res) => {
    try {
        const rawData = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        const data = JSON.parse(rawData);

        const { field } = req.query;
        if (field) {
            if (data.hasOwnProperty(field)) {
                res.json({ [field]: data[field] });
            } else {
                res.status(404).json({ message: `Field '${field}' tidak ditemukan dalam data.` });
            }
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data.' });
    }
});

app.get('/info/:id', (req, res) => {
    try {
        const rawData = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        const data = JSON.parse(rawData);

        const id = parseInt(req.params.id);
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
