#  PhishGuard - Extensão Anti-Phishing para Chrome

<div align="center">
  <img src="assets/icon128.png" alt="PhishGuard Logo" width="128" height="128">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://chrome.google.com/)
  [![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/seu-usuario/phishguard)
</div>

##  Sobre

PhishGuard é uma extensão de navegador que detecta ataques de phishing por meio de homóglifos e homógrafos, analisando:

- ✅ Caracteres Unicode homóglifos
- ✅ Substituições de caracteres (ex: "rn" → "m")
- ✅ Uso misto de scripts (Latino + Cirílico, etc.)
- ✅ Domínios Punycode
- ✅ Similaridade com domínios conhecidos

##  Funcionalidades

- **Monitoramento em Tempo Real**: Analisa automaticamente todas as URLs visitadas
- **Avisos Visuais**: Banner vermelho de alerta em sites suspeitos
- **Proteção Proativa**: Bloqueia navegação para sites potencialmente perigosos
- **Interface Intuitiva**: Popup moderno com análise detalhada
- **100% Local**: Todos os processamentos são feitos no navegador (sem envio de dados)
- **Domínios Brasileiros**: Proteção especial para sites brasileiros populares

##  Instalação

### Método 1: Instalação Manual (Desenvolvimento)

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/phishguard.git
cd phishguard
```

2. **Abra o Chrome e acesse**
```
chrome://extensions
```

3. **Ative o "Modo Desenvolvedor"** no canto superior direito

4. **Clique em "Carregar sem compactação"**

5. **Selecione a pasta do projeto**

### Método 2: Chrome Web Store (Em breve)
*A extensão estará disponível na Chrome Web Store em breve.*

##  Como Usar

1. **Instalação Automática**: A extensão começa a monitorar automaticamente após a instalação
2. **Ícone na Barra**: O ícone ficará vermelho quando detectar ameaças
3. **Banner de Aviso**: Sites suspeitos mostrarão um banner vermelho no topo
4. **Popup Detalhado**: Clique no ícone para ver análise completa do site atual

##  Testando a Extensão

Você pode testar com estes exemplos de domínios suspeitos:

- `https://www.gооgle.com` (com 'о' cirílico)
- `https://www.paypa1.com` (com '1' no lugar de 'l')
- `https://www.xn--ggle-55da.com` (punycode)

⚠️ **Atenção**: Estes são apenas exemplos para teste. Não visite sites suspeitos reais!

## 📁 Estrutura do Projeto

```
phishguard/
├── 📄 manifest.json 
├── 📄 README.md
├── 📄 LICENSE
├── 📄 .gitignore
├── 📁 assets/
│ ├── 🖼️ icon16.png
│ ├── 🖼️ icon48.png
│ └── 🖼️ icon128.png
├── 📁 scripts/
│ ├── 📄 background.js 
│ └── 📄 content.js 
├── 📁 popup/
│ ├── 📄 popup.html 
│ ├── 📄 popup.css 
│ └── 📄 popup.js 
└── 📁 options/
├── 📄 options.html 
├── 📄 options.css 
└── 📄 options.js 
```

##  Considerações de Segurança

### Limitações
- Não detecta todas as variações possíveis de homóglifos
- Não protege contra outras técnicas de phishing
- Limitado à análise de domínios (não analisa conteúdo da página)
- Pode gerar falsos positivos com domínios internacionais legítimos

### Privacidade
- ✅ Todo processamento é local (no navegador)
- ✅ Nenhum dado é enviado para servidores externos
- ✅ Não coleta informações pessoais
- ✅ Open source - código auditável

##  Tecnologias

- **Manifest V3**: Última versão do sistema de extensões do Chrome
- **Vanilla JavaScript**: Sem dependências externas
- **Chrome Extension APIs**: tabs, scripting, storage
- **Algoritmo de Levenshtein**: Para cálculo de similaridade de domínios

##  Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

### Ideias para Contribuir
- Adicionar mais domínios à whitelist
- Expandir a tabela de homóglifos
- Melhorar os algoritmos de detecção
- Adicionar suporte para outros navegadores
- Traduzir para outros idiomas

##  Roadmap

- [ ] Integração com Google Safe Browsing API
- [ ] Sistema de whitelist personalizável
- [ ] Relatórios de ameaças bloqueadas
- [ ] Modo de aprendizado com machine learning
- [ ] Suporte para Firefox e Edge
- [ ] Análise de conteúdo da página (não apenas URL)
- [ ] Sistema de reputação comunitária

##  Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

##  Autor

**Seu Nome**
- GitHub: [@shimaski](https://github.com/shimaski/)
- LinkedIn: [Adriel Shimaski ](https://www.linkedin.com/in/adrielshimaski/)

##  Agradecimentos

- Comunidade de segurança da informação
- Projeto Punycode.js
- Documentação do Chrome Extensions

---

<div align="center">
  
