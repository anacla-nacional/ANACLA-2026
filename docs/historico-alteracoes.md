# Histórico de Alterações — ANACLA 2026

## Resumo Geral

Documento com todas as alterações realizadas no projeto **ANACLA - Academia Nacional de Ciências, Letras e Artes**, desde a configuração inicial até as funcionalidades de gerenciamento de imagens.

---

## 1. Configuração Inicial e Design

### Commits iniciais (design alternativo)
- **feat:** Transfere header do design alternativo para a index
- **feat:** Hero com efeito avelúdo, gradientes e textura
- **feat:** Strip 01-02-03 (Identidade, Acervo, Participação)
- **feat:** Seção EM EVIDÊNCIA na index com layout alternativo
- **feat:** Seção FALE COM A ANACLA na index
- **feat:** Footer atualizado em todas as páginas
- **feat:** Menus atualizados com alt-header em todas as páginas internas

### Ajustes visuais
- Troca de paleta para azul-dourada com serif Playfair Display
- Ajustes de tamanho do hero, logo e header
- Correção de responsividade no mobile

---

## 2. Páginas Internas

### Páginas criadas/atualizadas
- `historia.html` — História da ANACLA
- `vinicius.html` — Patrono Vinícius de Moraes
- `obras.html` — Obras da ANACLA
- `diretoria.html` — Diretoria atual
- `hino.html` — Hino da ANACLA
- `premios.html` — Prêmios e Reconhecimentos
- `cadeiras.html` — Cadeiras (todas, incluindo vazias)
- `biografias.html` — Biografias dos acadêmicos
- `patronos.html` — Patronos
- `eventos.html` — Eventos com filtros
- `homenageados.html` — Homenageados
- `noticias.html` — Notícias
- `contato.html` — Formulário de contato
- `offline.html` — Página de manutenção
- `formatar.html` — Formatador de texto
- `upload.html` — Gerenciamento de imagens

### Funcionalidades por página
- **cadeiras.html:** Lista todas as cadeiras (1-59), incluindo vazias, com link para patronos
- **biografias.html:** Modal com biografia completa ao clicar no acadêmico
- **patronos.html:** Cards com biografia dos patronos
- **eventos.html:** Filtros por tipo (Todos, Oficiais, MOSALC, Homenageados, Feiras, Saraus)
- **contato.html:** Formulário com envio para Google Sheets

---

## 3. Linhas Horizontais (Páginas Internas)

### Implementação
- **Linha dourada:** `hero-linha-horizontal` — 5px, cor `var(--dourado)`
- **Linha preta:** `hero-linha-horizontal-preta` — 10px, cor `var(--texto)`

### Adicionada em todas as 13 páginas internas
- biografias, cadeiras, contato, diretoria, eventos, hino, homenageados, noticias, obras, patronos, premios, vinicius, historia

---

## 4. Link "Voltar"

### Implementação
- Link `< voltar` no topo de todas as páginas internas
- Alinhado à esquerda com `padding-left: 40px`
- Função `history.back()` para voltar à página anterior

---

## 5. Menu Horizontal Fixo

### Implementação
- `position: fixed` no `.alt-header`
- `padding-top: 80px` no `body` para compensar
- Menu permanece visível ao dar scroll

---

## 6. Títulos das Páginas Internas

### Implementação
- Removido fundo gradiente do `.hero`
- Cor do texto alterada para preto (`var(--texto)`)
- Sombra sutil no título: `text-shadow: 0 3px 12px rgba(0,0,0,.25)`
- Padding inferior ajustado para 10px

---

## 7. Seção "EM EVIDÊNCIA" (Index)

### Implementação
- Imagem do destaque com link para noticias.html
- Títulos dos itens 02, 03, 04 com link para noticias.html
- Texto abaixo da imagem (não sobreposta)

---

## 8. Formulário de Contato

### Sistema atual
- **Backend:** Google Apps Script na conta `anacla.admin@google.com`
- **Planilha:** "Contatos ANACLA" na nova conta
- **URL do script:** `https://script.google.com/macros/s/AKfycbykYDU_3mAq7yzYUwDxVl31Si7lWWnVPR31d6aBIppnRvltpvtptyFKf3LlovTg8q0ZWA/exec`

### Fluxo
1. Cliente preenche nome, email, fone e mensagem
2. Clica em "Enviar"
3. Dados vão para a planilha Google
4. Mensagem de sucesso aparece

---

## 9. Sistema de Upload de Imagens

### Página: `upload.html`
- **URL:** https://anacla-nacional.github.io/ANACLA-2026/upload.html

### Funcionalidades

#### Upload
- Seleciona pasta (academicos/patronos/eventos)
- Digita o nome do arquivo
- Faz upload da imagem
- Envia para o GitHub via Google Apps Script

#### Listar imagens
- Seleciona a pasta
- Clica em "Listar imagens"
- Lista todas as imagens da pasta

#### Renomear imagem
- Clica no ícone ✏️ ao lado da imagem
- Digita o novo nome
- Confirma

#### Deletar imagem
- Clica no ícone 🗑️ ao lado da imagem
- Confirma a exclusão

### Backend: Google Apps Script
- **URL:** `https://script.google.com/macros/s/AKfycbw-jWj5lA8C5qy81G_Eux18RkBMVCEWKJ5ApFTDDhQgFtma3bsZcT2tuNg2HDsPNDXE8w/exec`
- **Funções:** upload, listar (JSONP), deletar, renomear

---

## 10. Google Sheets

### Planilha principal
- **URL:** https://docs.google.com/spreadsheets/d/1hwxHnHTUsJ_1deZajtTk2B4pJGQTfN8jBCYq_dSPqhY/edit

### Abas
| Aba | Descrição |
|-----|-----------|
| academicos | Dados dos acadêmicos (nome, foto, biografia, patrono, data_posse) |
| diretoria | Composição da diretoria |
| eventos | Eventos da ANACLA |
| noticias | Notícias e destaques |
| patronos | Dados dos patronos |
| homenageados | Homenageados |
| config | Configurações gerais |

---

## 11. GitHub

### Repositório
- **URL:** https://github.com/anacla-nacional/ANACLA-2026
- **Branch principal:** main
- **GitHub Pages:** https://anacla-nacional.github.io/ANACLA-2026/

### Conta
- **Usuário:** anacla-nacional
- **Email:** anacla.admin@google.com

---

## 12. Imagens

### Estrutura de pastas
```
imagens/
├── academicos/     (37 fotos dos acadêmicos)
├── eventos/        (10 fotos dos eventos)
├── patronos/       (12 fotos dos patronos)
└── estaticas/      (4 imagens estáticas)
    ├── logo_anacla.png
    ├── bandeira_3D.png
    ├── imagem_capa_fundo.png
    └── placeholder.svg
```

### Imagens não utilizadas
- `imagens não utilizadas/` — Duplicatas removidas (logo-anacla.png, bandeira_3D-2.jpeg)

---

## 13. Scripts auxiliares

### Google Apps Scripts
| Script | Conta | Função |
|--------|-------|--------|
| Contato | anacla.admin@google.com | Recebe formulário de contato |
| Upload/Gerenciamento | anacla.admin@google.com | Upload, listar, deletar, renomear imagens |

---

## 14. Credenciais e Segurança

### Token GitHub
- **Usuário:** anacla-nacional
- **Permissão:** repo
- **⚠️ Revogar** após término dos trabalhos em: https://github.com/settings/tokens

### Google Apps Script
- Deploy como aplicativo da web
- Acesso: Qualquer pessoa
- Conta: anacla.admin@google.com

---

## 15. Comandos Úteis

### Git
```bash
# Ver status
git status

# Ver commits
git log --oneline

# Adicionar e commitar
git add -A
git commit -m "Mensagem"

# Enviar ao GitHub
git push origin main
```

### Sincronização
- Todo trabalho local deve ser commitado e enviado ao GitHub
- `working tree clean` = tudo sincronizado

---

*Documento atualizado em: 01/09/2026*
