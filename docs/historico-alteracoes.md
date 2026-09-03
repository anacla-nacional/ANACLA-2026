# Histórico de Alterações — ANACLA 2026

## Resumo Geral

Documento com todas as alterações realizadas no projeto **ANACLA - Academia Nacional de Ciências, Letras e Artes**.

---

## 1. Design e Layout

- Header alternativo com menu dropdown dourado
- Hero com imagem de fundo e selo dourado
- Strip 01-02-03 (Identidade, Acervo, Participação)
- Seção EM EVIDÊNCIA com destaques
- Footer com links e redes sociais
- Paleta: azul escuro `#071a2b`, dourado `#c9a55b`, vermelho `#8f0b16`
- Fonte: Playfair Display (títulos) + Arial (corpo)

---

## 2. Páginas Internas (13 páginas)

- `historia.html`, `vinicius.html`, `obras.html`, `diretoria.html`
- `hino.html`, `premios.html`, `cadeiras.html`, `biografias.html`
- `patronos.html`, `eventos.html`, `homenageados.html`
- `noticias.html`, `contato.html`

### Páginas especiais
- `offline.html` — página de manutenção
- `formatar.html` — formatador de texto
- `upload.html` — upload de imagens

---

## 3. Elementos visuais nas páginas internas

- **Linha dourada:** `hero-linha-horizontal` — 5px, `var(--dourado)`
- **Linha preta:** `hero-linha-horizontal-preta` — 10px, `var(--texto)`
- **Botão voltar:** `btn-voltar` — fixo canto inferior esquerdo, mesmo estilo do btn-topo
- **Menu fixo:** `position: fixed` no `.alt-header`
- **Título:** sem fundo, texto preto, sombra sutil

---

## 4. Formulário de Contato

- **Backend:** Google Apps Script (`anacla.admin@google.com`)
- **URL script:** `https://script.google.com/macros/s/AKfycbykYDU_3mAq7yzYUwDxVl31Si7lWWnVPR31d6aBIppnRvltpvtptyFKf3LlovTg8q0ZWA/exec`
- **Planilha destino:** "Contatos ANACLA"

---

## 5. Upload de Imagens

- **Página:** `upload.html`
- **URL:** https://anacla-nacional.github.io/ANACLA-2026/upload.html
- **Backend:** Google Apps Script (`anacla.admin@google.com`)
- **URL script:** `https://script.google.com/macros/s/AKfycbwyaqxba5jnn_YauYoufFyk-DUQIOMGwNDgtGezLLi0qa-aO9To5N8L0WCDSvYKFPVBpg/exec`
- **Funcionalidade:** Upload de imagens para o GitHub (academicos/patronos/eventos)

---

## 6. Sistema de Telefones

- **Aba:** `telefones` na planilha Google
- **Formato:** Coluna A = chave, Coluna B = valor
- **Dados:** `whatsapp_secretaria`, `whatsapp_presidencia`, `telegram`
- **Páginas:** `contato.html` e `offline.html` leem da aba `telefones`
- **Função:** `buscarTelefones()` no `sheets.js`

---

## 7. Google Sheets

- **URL:** https://docs.google.com/spreadsheets/d/1hwxHnHTUsJ_1deZajtTk2B4pJGQTfN8jBCYq_dSPqhY/edit

| Aba | Descrição |
|-----|-----------|
| academicos | Dados dos acadêmicos |
| diretoria | Composição da diretoria |
| eventos | Eventos da ANACLA |
| noticias | Notícias e destaques |
| patronos | Dados dos patronos |
| homenageados | Homenageados |
| config | Configurações gerais |
| telefones | Telefones secretaria e presidência |

---

## 8. GitHub

- **Repositório:** https://github.com/anacla-nacional/ANACLA-2026
- **GitHub Pages:** https://anacla-nacional.github.io/ANACLA-2026/
- **Conta:** anacla-nacional (anacla.admin@google.com)

---

## 9. Imagens

```
imagens/
├── academicos/     (38 fotos)
├── eventos/        (10 fotos)
├── patronos/       (12 fotos)
└── estaticas/      (logo, bandeira, fundo, placeholder)
```

---

## 10. Scripts Google Apps

| Script | Função |
|--------|--------|
| Contato | Recebe formulário de contato |
| Upload | Upload de imagens para GitHub |

---

## 11. Segurança

- **Token GitHub:** anacla-nacional, permissão repo
- **⚠️ Revogar** em: https://github.com/settings/tokens
- **Google Apps Script:** Deploy como web app, acesso público

---

*Documento atualizado em: 02/09/2026*
