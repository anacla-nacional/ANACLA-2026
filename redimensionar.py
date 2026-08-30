from PIL import Image
import os

pasta = r'F:\ANACLA_2026\imagens\academicos'
tamanho_max = 400

for arquivo in os.listdir(pasta):
    if arquivo.endswith('.png'):
        caminho = os.path.join(pasta, arquivo)
        try:
            img = Image.open(caminho)
            img.thumbnail((tamanho_max, tamanho_max), Image.LANCZOS)
            img.save(caminho, 'PNG', optimize=True)
            print(f'OK {arquivo}: {img.size[0]}x{img.size[1]}')
        except Exception as e:
            print(f'ERRO {arquivo}: {e}')

print('Concluido!')
