// Google Sheets Integration
const SHEETS_ID = '1GXom2kdYCM4IMzrxo88U-qoqC4_XTd5u9jJOUTYfuBU';
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
            const lines = text.split('\n');
            const headers = this.parseCsvLine(lines[0]);
            const data = [];
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim() === '') continue;
                const values = this.parseCsvLine(lines[i]);
                const obj = {};
                headers.forEach((h, idx) => obj[h] = values[idx] || '');
                data.push(obj);
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
    
    async buscarConfig() {
        const data = await this.fetch('config');
        const config = {};
        // Formato vertical: cada linha é uma chave,valor
        data.forEach(c => {
            if (c.chave && c.valor) config[c.chave.trim()] = c.valor.trim();
        });
        // Fallback: formato horizontal (tudo numa linha com espaços)
        if (Object.keys(config).length <= 1 && data.length > 0) {
            var row = data[0];
            var keys = Object.keys(row);
            if (keys.length > 0) {
                var keyStr = row[keys[0]] || '';
                var valStr = keys.length > 1 ? row[keys[1]] || '' : '';
                var keyParts = keyStr.split(/\s+/);
                var valParts = valStr.split(/\s+/);
                for (var i = 0; i < keyParts.length; i++) {
                    if (keyParts[i] && valParts[i]) {
                        config[keyParts[i]] = valParts[i];
                    }
                }
            }
        }
        return config;
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
