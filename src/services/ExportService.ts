import JSZip from 'jszip';
import { CanvasComponent, CodeGenerationOptions } from '../types';
import { CodeGenerator } from './CodeGenerator';

export class ExportService {
  private codeGenerator: CodeGenerator;

  constructor() {
    this.codeGenerator = new CodeGenerator();
  }

  async exportProject(
    components: Record<string, CanvasComponent>,
    options: CodeGenerationOptions,
    projectName: string = 'buildify-project'
  ): Promise<Blob> {
    const zip = new JSZip();

    // Gerar código principal
    const mainCode = this.codeGenerator.generateCode(components, options);
    
    // Adicionar arquivos baseados no formato
    switch (options.format) {
      case 'react':
        await this.addReactFiles(zip, mainCode, options, projectName);
        break;
      case 'vue':
        await this.addVueFiles(zip, mainCode, options, projectName);
        break;
      case 'web-components':
        await this.addWebComponentsFiles(zip, mainCode, options, projectName);
        break;
    }

    // Adicionar arquivos de configuração
    this.addConfigFiles(zip, options);
    
    // Adicionar README
    this.addReadme(zip, projectName, options);

    // Gerar ZIP
    return await zip.generateAsync({ type: 'blob' });
  }

  private async addReactFiles(
    zip: JSZip,
    mainCode: string,
    options: CodeGenerationOptions,
    projectName: string
  ) {
    // Componente principal
    zip.file('src/App.tsx', mainCode);

    // package.json
    const packageJson = this.generateReactPackageJson(options);
    zip.file('package.json', JSON.stringify(packageJson, null, 2));

    // index.html
    const indexHtml = this.generateIndexHtml(projectName);
    zip.file('index.html', indexHtml);

    // main.tsx
    const mainTsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
    zip.file('src/main.tsx', mainTsx);

    // index.css
    const indexCss = this.generateIndexCss(options);
    zip.file('src/index.css', indexCss);

    // tsconfig.json
    if (options.typescript) {
      const tsconfig = this.generateTsConfig();
      zip.file('tsconfig.json', JSON.stringify(tsconfig, null, 2));
    }

    // vite.config.ts
    const viteConfig = this.generateViteConfig();
    zip.file('vite.config.ts', viteConfig);
  }

  private async addVueFiles(
    zip: JSZip,
    mainCode: string,
    options: CodeGenerationOptions,
    projectName: string
  ) {
    // Componente principal
    zip.file('src/App.vue', mainCode);

    // package.json
    const packageJson = this.generateVuePackageJson(options);
    zip.file('package.json', JSON.stringify(packageJson, null, 2));

    // index.html
    const indexHtml = this.generateIndexHtml(projectName);
    zip.file('index.html', indexHtml);

    // main.ts
    const mainTs = `import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')`;
    zip.file('src/main.ts', mainTs);

    // index.css
    const indexCss = this.generateIndexCss(options);
    zip.file('src/index.css', indexCss);

    // vite.config.ts
    const viteConfig = this.generateViteConfig(true);
    zip.file('vite.config.ts', viteConfig);
  }

  private async addWebComponentsFiles(
    zip: JSZip,
    mainCode: string,
    options: CodeGenerationOptions,
    projectName: string
  ) {
    // Componente principal
    zip.file('src/components.js', mainCode);

    // index.html
    const indexHtml = this.generateWebComponentsIndexHtml(projectName);
    zip.file('index.html', indexHtml);

    // package.json
    const packageJson = this.generateWebComponentsPackageJson();
    zip.file('package.json', JSON.stringify(packageJson, null, 2));

    // index.css
    const indexCss = this.generateIndexCss(options);
    zip.file('src/index.css', indexCss);
  }

  private addConfigFiles(zip: JSZip, _options: CodeGenerationOptions) {
    // .gitignore
    const gitignore = `node_modules
dist
.env
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*`;
    zip.file('.gitignore', gitignore);

    // .editorconfig
    const editorconfig = `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true`;
    zip.file('.editorconfig', editorconfig);
  }

  private addReadme(zip: JSZip, projectName: string, options: CodeGenerationOptions) {
    const readme = `# ${projectName}

Este projeto foi gerado pelo Buildify - Editor Visual de Interfaces.

## 🚀 Como executar

\`\`\`bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
\`\`\`

## 📦 Tecnologias

- **Formato**: ${options.format.toUpperCase()}
- **Framework**: ${options.framework}
- **Estilização**: ${options.styling}
- **TypeScript**: ${options.typescript ? 'Sim' : 'Não'}

## 🎨 Personalização

Você pode personalizar os componentes editando os arquivos na pasta \`src/\`.

## 📄 Licença

MIT License - Veja o arquivo LICENSE para mais detalhes.

---

Gerado com ❤️ pelo [Buildify](https://buildify.app)`;
    
    zip.file('README.md', readme);
  }

  private generateReactPackageJson(options: CodeGenerationOptions) {
    const baseDeps: Record<string, string> = {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
    };

    const devDeps: Record<string, string> = {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.0.0',
      'vite': '^4.4.0',
    };

    if (options.styling === 'styled-components') {
      baseDeps['styled-components'] = '^6.0.0';
      devDeps['@types/styled-components'] = '^5.1.0';
    }

    if (options.styling === 'tailwind') {
      devDeps['tailwindcss'] = '^3.3.0';
      devDeps['autoprefixer'] = '^10.4.0';
      devDeps['postcss'] = '^8.4.0';
    }

    if (options.typescript) {
      devDeps['typescript'] = '^5.0.0';
    }

    return {
      name: 'buildify-project',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: options.typescript ? 'tsc && vite build' : 'vite build',
        preview: 'vite preview',
        lint: 'eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0',
      },
      dependencies: baseDeps,
      devDependencies: devDeps,
    };
  }

  private generateVuePackageJson(_options: CodeGenerationOptions) {
    return {
      name: 'buildify-project',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vue-tsc && vite build',
        preview: 'vite preview',
      },
      dependencies: {
        'vue': '^3.3.0',
      },
      devDependencies: {
        '@vitejs/plugin-vue': '^4.0.0',
        'typescript': '^5.0.0',
        'vue-tsc': '^1.8.0',
        'vite': '^4.4.0',
      },
    };
  }

  private generateWebComponentsPackageJson() {
    return {
      name: 'buildify-project',
      private: true,
      version: '0.0.0',
      type: 'module',
      scripts: {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
      },
      devDependencies: {
        'vite': '^4.4.0',
      },
    };
  }

  private generateIndexHtml(projectName: string) {
    return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  }

  private generateWebComponentsIndexHtml(projectName: string) {
    return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${projectName}</title>
    <link rel="stylesheet" href="/src/index.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/components.js"></script>
  </body>
</html>`;
  }

  private generateIndexCss(options: CodeGenerationOptions) {
    if (options.styling === 'tailwind') {
      return `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;
    }

    return `body {
  margin: 0;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`;
  }

  private generateTsConfig() {
    return {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }],
    };
  }

  private generateViteConfig(isVue = false) {
    if (isVue) {
      return `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})`;
    }

    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`;
  }
}
