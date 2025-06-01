# Link Vault

Um projeto simples e eficiente para gerenciamento de links, com sistema de proteção contra bots através de captcha. Desenvolvido para compartilhar links de forma segura, evitando a extração automatizada por crawlers e bots maliciosos.

## 🚀 Tecnologias Utilizadas

- [Vite](https://vitejs.dev/) - Build tool e servidor de desenvolvimento
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript com tipagem estática
- [React](https://reactjs.org/) - Biblioteca JavaScript para construção de interfaces
- [shadcn-ui](https://ui.shadcn.com/) - Componentes UI reutilizáveis
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) - Proteção contra bots

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta no Cloudflare Turnstile para obter as chaves de API

## 🔧 Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/whitestonedev/link-vault.git
cd link-vault
```

2. Copie o arquivo de exemplo das variáveis de ambiente:
```bash
cp .env.example .env
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
# Chave do site do Cloudflare Turnstile
VITE_TURNSTILE_SITE_KEY=sua_chave_aqui
```

4. Para deploy no GitHub Pages, adicione a variável `TURNSTILE_SITE_KEY` nas secrets do repositório:
   - Vá para Settings > Secrets and variables > Actions
   - Clique em "New repository secret"
   - Nome: `TURNSTILE_SITE_KEY`
   - Valor: Sua chave do Turnstile

## 🛠️ Instalação e Execução

1. Instale as dependências:
```bash
npm install
# ou
yarn install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

O projeto estará disponível em `http://localhost:8080`

## 📝 Como Editar Links

1. Navegue até o arquivo `src/data/links.json`
2. Edite o arquivo seguindo o formato:
```json
[
  {
    "slug": "identificador-unico",
    "name": "Nome do Link",
    "link": "https://exemplo.com",
    "image_link": "https://exemplo.com/imagem.png",
    "icon_name": "NomeDoIcone",
    "icon_link": "https://exemplo.com/icone.png",
    "position": 0,
    "visible": true
  }
]
```

### Campos do Link:
- `slug`: Identificador único para o link
- `name`: Nome exibido do link
- `link`: URL de destino
- `image_link`: URL da imagem principal
- `icon_name`: Nome do ícone (opcional)
- `icon_link`: URL do ícone
- `position`: Posição na ordem de exibição
- `visible`: Se o link deve ser exibido (true/false)

### Regras de Exibição:

1. **Prioridade de Ícones**:
   - Se `icon_link` estiver presente, ele será usado como ícone principal
   - Se `icon_link` não estiver presente, o sistema tentará usar o `icon_name`
   - Se nenhum dos dois estiver presente, será exibido apenas o `image_link`

2. **Ordenação dos Links**:
   - Links são ordenados primariamente pelo campo `position`
   - Links com `position` nulo ou não definido são movidos para o final da lista
   - Em caso de `position` duplicado, a ordem será mantida conforme a sequência no arquivo JSON
   - Links com `visible: false` não são exibidos

A ordenação é feita da seguinte forma:
- Primeiro, filtra apenas os links visíveis (`visible: true`)
- Em seguida, ordena os links baseado no campo `position`
- Links sem `position` válido (não numérico) recebem `Infinity` como valor
- A ordem original do JSON é mantida para links com `position` igual
- Links com `position: null` ou sem `position` são movidos para o final

## 🏗️ Estrutura do Projeto

```
link-vault-beams/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── data/          # Dados e configurações
│   │   └── links.json # Arquivo de configuração dos links
│   ├── pages/         # Páginas da aplicação
│   │   └── Home.tsx   # Página principal com lógica de ordenação
│   └── App.tsx        # Componente principal
├── public/            # Arquivos estáticos
└── ...
```

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Faça o Commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
