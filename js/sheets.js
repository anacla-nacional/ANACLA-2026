// Google Sheets Integration
const SHEETS_ID = '1hwxHnHTUsJ_1deZajtTk2B4pJGQTfN8jBCYq_dSPqhY';
const BASE_URL = 'https://docs.google.com/spreadsheets/d/' + SHEETS_ID + '/gviz/tq?tqx=out:csv&sheet=';

const sheets = {
    cache: {},
    
    parseCsvLine(line) {
        const result = [];
        let current = '';
        let inQuotes = false;
        
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                result.push(current.trim());
                current = '';
            } else {
                current += char;
            }
        }
        result.push(current.trim());
        return result;
    },
    
    async fetch(sheetName) {
        if (this.cache[sheetName]) return this.cache[sheetName];
        try {
            const response = await fetch(BASE_URL + encodeURIComponent(sheetName));
            const text = await response.text();
            
            // Parse CSV com suporte a quebras de linha dentro de aspas
            const data = [];
            let headers = [];
            let i = 0;
            const lines = text.split('\n');
            
            while (i < lines.length) {
                let line = lines[i];
                // Se a linha tem número ímpar de aspas, é linha quebrada - juntar com a próxima
                while (line.split('"').length % 2 === 0 && i + 1 < lines.length) {
                    i++;
                    line += '\n' + lines[i];
                }
                
                if (headers.length === 0) {
                    headers = this.parseCsvLine(line);
                } else if (line.trim() !== '') {
                    const values = this.parseCsvLine(line);
                    const obj = {};
                    headers.forEach((h, idx) => obj[h] = values[idx] || '');
                    data.push(obj);
                }
                i++;
            }
            
            this.cache[sheetName] = data;
            return data;
        } catch(e) {
            console.error('Erro: ' + sheetName, e);
            return [];
        }
    },
    
    async buscarAcademicos() {
        const data = await this.fetch('academicos');
        return data.filter(a => a.ativo === 'SIM');
    },
    
    async buscarDiretoria() {
        const data = await this.fetch('diretoria');
        return data.sort((a, b) => parseInt(a.ordem) - parseInt(b.ordem));
    },
    
    async buscarEventos(tipo) {
        const data = await this.fetch('eventos');
        if (tipo && tipo !== 'todos') return data.filter(e => e.tipo === tipo);
        return data.sort((a, b) => new Date(b.data) - new Date(a.data));
    },
    
    async buscarNoticias() {
        const data = await this.fetch('noticias');
        return data.sort((a, b) => new Date(b.data) - new Date(a.data));
    },
    
    async buscarPatrono(cadeira) {
        const data = await this.fetch('patronos');
        return data.find(p => p.cadeira === String(cadeira));
    },
    
    async buscarPatronos() {
        const data = await this.fetch('patronos');
        return data.sort((a, b) => parseInt(a.cadeira) - parseInt(b.cadeira));
    },
    
    async buscarHomenageados() {
        const data = await this.fetch('homenageados');
        return data.sort((a, b) => new Date(b.data) - new Date(a.data));
    },
    
    async buscarConfig() {
        const data = await this.fetch('config');
        const config = {};
        if (data.length === 0) return config;

        var firstRow = data[0];
        var keys = Object.keys(firstRow);

        // Formato vertical: coluna A = chave, coluna B = valor
        if (keys[0] === 'chave' && keys[1] === 'valor') {
            data.forEach(function (row) {
                if (row.chave) config[row.chave.trim()] = (row.valor || '').trim();
            });
            return config;
        }

        // Formato horizontal: primeira linha = chaves, segunda linha = valores
        var headerValues = [];
        var valueValues = [];
        keys.forEach(function (k) {
            var h = firstRow[k];
            if (h !== undefined && h !== '') headerValues.push(String(h).trim());
        });
        if (data.length > 1) {
            var secondRow = data[1];
            var keys2 = Object.keys(secondRow);
            keys2.forEach(function (k) {
                var v = secondRow[k];
                if (v !== undefined) valueValues.push(String(v).trim());
            });
        }
        for (var i = 0; i < headerValues.length; i++) {
            if (headerValues[i] && valueValues[i]) {
                config[headerValues[i]] = valueValues[i];
            }
        }
        return config;
    },
    
    async buscarStatus() {
        try {
            const response = await fetch(BASE_URL + encodeURIComponent('status'));
            const text = await response.text();
            var lines = text.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i].trim().replace(/"/g, '').toLowerCase();
                if (line === 'online' || line === 'offline') return line;
            }
            return 'online';
        } catch(e) {
            return 'online';
        }
    },
    
    converterLink(url, id) {
        if (!url) return 'imagens/academicos/' + id + '.png';
        if (url.startsWith('imagens/')) return url;
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
        if (match) return 'https://lh3.googleusercontent.com/d/' + match[1];
        return url;
    }
};

window.sheets = sheets;
