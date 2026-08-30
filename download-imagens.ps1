# ============================================
# ANACLA - Script de Download de Imagens
# ============================================

# Configuração
$baseUrl = "http://www.anacla.com.br"
$outputBase = "F:\ANACLA_2026\imagens"

# Criar pastas
$folders = @(
    "$outputBase\academicos",
    "$outputBase\eventos",
    "$outputBase\favicons",
    "$outputBase\estaticas",
    "F:\ANACLA_2026\pdf"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "Pasta criada: $folder" -ForegroundColor Green
    }
}

# Função para baixar
function Download-File {
    param([string]$url, [string]$outputPath)
    try {
        $fileName = Split-Path $url -Leaf
        $outputFile = Join-Path $outputPath $fileName
        Write-Host "Baixando: $fileName" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $outputFile -ErrorAction Stop
        Write-Host "  OK: $fileName" -ForegroundColor Green
        return $true
    } catch {
        Write-Host "  ERRO: $url" -ForegroundColor Red
        return $false
    }
}

# ============================================
# 1. FOTOS DOS ACADÊMICOS
# ============================================
Write-Host "`n=== ACADEMICOS ===" -ForegroundColor Cyan

$academicos = @(
    "1-mara.png", "3-alessandro.png", "4-grazieli.png", "7-marcos.png",
    "9-ariadne.png", "10-silvia.png", "11-rosangela.png", "12-sibeli.png",
    "13-felipe.png", "14-edilamar.png", "15-ailton.png", "16-christiane.png",
    "18-maria-luiza.png", "19-erika.png", "20-01-talitha.png", "21-cynthia.png",
    "22-01-carloscaldas.png", "23-mara-eneida.png", "24-maria-elena.png",
    "25-edenice.png", "26-daniela.png", "27-luiz.png", "29-moema.png",
    "30-miriam-leal.png", "31-paulo-roberto.png", "34-adir.png",
    "36-miriam-braga.png", "37-claudia-rocha.png", "38-paulo-ricardo.png",
    "39-rosana.png", "40-alana.png", "42-joao.png", "46-claudia-messores.png",
    "48-arlene.png", "52-Nelma.png", "53-claudio.png", "54-marcella.png",
    "55-thayna.png", "56-virginia.png", "57-vilmar.png", "58-maria-suely.png",
    "59-eliana.png"
)

$count = 0
foreach ($foto in $academicos) {
    $url = "$baseUrl/imagens/cadeiras/$foto"
    if (Download-File -url $url -outputPath "$outputBase\academicos") { $count++ }
}
Write-Host "Academicos: $count baixados" -ForegroundColor Green

# ============================================
# 2. IMAGENS DOS EVENTOS
# ============================================
Write-Host "`n=== EVENTOS ===" -ForegroundColor Cyan

$eventos = @(
    "ID00079-Evento-23-05-23-Online.png",
    "ID00065-Evento-Oficial-24-06-22.png",
    "ID00077-evento-oficial-Marcos-Costa.png",
    "ID00074-Evento-Oficial-V-Posse-09-07-2021.png",
    "ID00067-Evento-Oficial-V-Posse-OnLine-09-07-21.png",
    "ID00070-Evento-Oficial-18-10-19.png",
    "ID00072-evento-oficial-III-Evento-Posse-29-08-2019.png",
    "ID00073-evento-oficial-II-Posse-24-05-2019.png",
    "ID00015-Evento-Oficial-20-07-2018.png"
)

$count = 0
foreach ($evento in $eventos) {
    $url = "$baseUrl/imagens/eventoOficial/$evento"
    if (Download-File -url $url -outputPath "$outputBase\eventos") { $count++ }
}
Write-Host "Eventos: $count baixados" -ForegroundColor Green

# ============================================
# 3. FAVICONS
# ============================================
Write-Host "`n=== FAVICONS ===" -ForegroundColor Cyan

$favicons = @(
    "apple-icon-57x57.png", "apple-icon-60x60.png", "apple-icon-72x72.png",
    "apple-icon-76x76.png", "apple-icon-114x114.png", "apple-icon-120x120.png",
    "apple-icon-144x144.png", "apple-icon-152x152.png", "apple-icon-180x180.png",
    "android-icon-192x192.png", "favicon-32x32.png", "favicon-96x96.png",
    "favicon-16x16.png", "ms-icon-144x144.png"
)

$count = 0
foreach ($favicon in $favicons) {
    $url = "$baseUrl/imagens/anacla/favicon/$favicon"
    if (Download-File -url $url -outputPath "$outputBase\favicons") { $count++ }
}
Write-Host "Favicons: $count baixados" -ForegroundColor Green

# ============================================
# 4. IMAGENS ESTÁTICAS
# ============================================
Write-Host "`n=== ESTATICAS ===" -ForegroundColor Cyan

$estaticas = @(
    @{url="/imagens/bandeira_3D.png"; nome="bandeira_3D.png"},
    @{url="/imagens/sitePadrao/formulario.jpg"; nome="formulario.jpg"},
    @{url="/imagens/sitePadrao/manutencao.jpg"; nome="manutencao.jpg"}
)

$count = 0
foreach ($estatica in $estaticas) {
    $url = "$baseUrl$($estatica.url)"
    $outputFile = Join-Path "$outputBase\estaticas" $estatica.nome
    try {
        Write-Host "Baixando: $($estatica.nome)" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $outputFile -ErrorAction Stop
        Write-Host "  OK: $($estatica.nome)" -ForegroundColor Green
        $count++
    } catch {
        Write-Host "  ERRO: $url" -ForegroundColor Red
    }
}
Write-Host "Estaticas: $count baixadas" -ForegroundColor Green

# ============================================
# 5. PDFs
# ============================================
Write-Host "`n=== PDFs ===" -ForegroundColor Cyan

$pdfs = @(
    @{url="/pdf/estatuto.pdf"; nome="estatuto.pdf"},
    @{url="/pdf/regimento_interno.pdf"; nome="regimento_interno.pdf"}
)

$count = 0
foreach ($pdf in $pdfs) {
    $url = "$baseUrl$($pdf.url)"
    $outputFile = Join-Path "F:\ANACLA_2026\pdf" $pdf.nome
    try {
        Write-Host "Baixando: $($pdf.nome)" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $outputFile -ErrorAction Stop
        Write-Host "  OK: $($pdf.nome)" -ForegroundColor Green
        $count++
    } catch {
        Write-Host "  ERRO: $url" -ForegroundColor Red
    }
}
Write-Host "PDFs: $count baixados" -ForegroundColor Green

# ============================================
# RESUMO
# ============================================
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "DOWNLOAD COMPLETO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Imagens: $outputBase" -ForegroundColor White
Write-Host "PDFs: F:\ANACLA_2026\pdf" -ForegroundColor White
