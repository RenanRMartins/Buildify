import { CanvasComponent, CodeGenerationOptions } from '../types';

export class CodeGenerator {
  generateCode(components: Record<string, CanvasComponent>, options: CodeGenerationOptions): string {
    const componentList = Object.values(components);
    
    if (componentList.length === 0) {
      return this.generateEmptyComponent(options);
    }

    switch (options.format) {
      case 'react':
        return this.generateReactCode(componentList, options);
      case 'vue':
        return this.generateVueCode(componentList, options);
      case 'web-components':
        return this.generateWebComponentsCode(componentList, options);
      default:
        return this.generateReactCode(componentList, options);
    }
  }

  private generateReactCode(components: CanvasComponent[], options: CodeGenerationOptions): string {
    const imports = this.generateReactImports(options);
    const componentCode = this.generateReactComponents(components, options);
    const styles = this.generateStyles(components, options);

    return `${imports}

${componentCode}

${styles}`;
  }

  private generateVueCode(components: CanvasComponent[], options: CodeGenerationOptions): string {
    const componentCode = this.generateVueComponents(components, options);
    const styles = this.generateStyles(components, options);

    return `<template>
  <div class="buildify-app">
    ${this.generateVueTemplate(components)}
  </div>
</template>

<script setup lang="ts">
${componentCode}
</script>

<style scoped>
${styles}
</style>`;
  }

  private generateWebComponentsCode(components: CanvasComponent[], options: CodeGenerationOptions): string {
    return `// Web Components gerados pelo Buildify
${this.generateWebComponents(components, options)}`;
  }

  private generateReactImports(options: CodeGenerationOptions): string {
    const imports = ['import React from "react";'];
    
    if (options.styling === 'styled-components') {
      imports.push('import styled from "styled-components";');
    }
    
    if (options.typescript) {
      imports.push('import { CSSProperties } from "react";');
    }

    return imports.join('\n');
  }

  private generateReactComponents(components: CanvasComponent[], options: CodeGenerationOptions): string {
    const mainComponent = `const BuildifyApp: React.FC = () => {
  return (
    <div className="buildify-app">
      ${components.map(comp => this.generateReactComponent(comp, options)).join('\n      ')}
    </div>
  );
};

export default BuildifyApp;`;

    return mainComponent;
  }

  private generateReactComponent(component: CanvasComponent, options: CodeGenerationOptions): string {
    const { type, style, props } = component;
    const styleString = this.generateStyleString(style, options);

    switch (type) {
      case 'button':
        return `<button style={${styleString}}>
          ${props.text || 'Botão'}
        </button>`;

      case 'card':
        return `<div style={${styleString}}>
          <h3>${props.title || 'Título do Card'}</h3>
          <p>${props.description || 'Descrição do card aqui...'}</p>
        </div>`;

      case 'text':
        return `<p style={${styleString}}>
          ${props.text || 'Texto'}
        </p>`;

      case 'input':
        return `<input 
          style={${styleString}}
          placeholder="${props.placeholder || 'Digite aqui...'}"
          type="text"
        />`;

      case 'image':
        return `<div style={${styleString}}>
          <img 
            src="${props.src || '#'}" 
            alt="${props.alt || 'Imagem'}"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>`;

      case 'container':
        return `<div style={${styleString}}>
          {/* Container vazio */}
        </div>`;

      case 'checkbox':
        return `<label style={${styleString}}>
          <input type="checkbox" />
          ${props.label || 'Checkbox'}
        </label>`;

      case 'radio':
        return `<label style={${styleString}}>
          <input type="radio" name="${props.name || 'radio'}" />
          ${props.label || 'Radio'}
        </label>`;

      case 'table':
        return `<table style={${styleString}}>
          <thead>
            <tr>
              <th>Coluna 1</th>
              <th>Coluna 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dado 1</td>
              <td>Dado 2</td>
            </tr>
          </tbody>
        </table>`;

      case 'chart':
        return `<div style={${styleString}}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
            color: 'white',
            borderRadius: '8px'
          }}>
            📊 Gráfico
          </div>
        </div>`;

      case 'spacer':
        return `<div style={${styleString}} />`;

      default:
        return `<div style={${styleString}}>
          {/* ${type} component */}
        </div>`;
    }
  }

  private generateVueTemplate(components: CanvasComponent[]): string {
    return components.map(comp => this.generateVueComponent(comp)).join('\n    ');
  }

  private generateVueComponent(component: CanvasComponent): string {
    const { type, style, props } = component;
    const styleString = this.generateStyleString(style, { 
      format: 'vue',
      framework: 'vite',
      styling: 'css-modules',
      typescript: true,
      prettier: true
    });

    switch (type) {
      case 'button':
        return `<button :style="${styleString}">
          ${props.text || 'Botão'}
        </button>`;

      case 'card':
        return `<div :style="${styleString}">
          <h3>${props.title || 'Título do Card'}</h3>
          <p>${props.description || 'Descrição do card aqui...'}</p>
        </div>`;

      case 'text':
        return `<p :style="${styleString}">
          ${props.text || 'Texto'}
        </p>`;

      case 'input':
        return `<input 
          :style="${styleString}"
          :placeholder="${props.placeholder || 'Digite aqui...'}"
          type="text"
        />`;

      default:
        return `<div :style="${styleString}">
          <!-- ${type} component -->
        </div>`;
    }
  }

  private generateVueComponents(components: CanvasComponent[], options: CodeGenerationOptions): string {
    return `// Componentes Vue gerados pelo Buildify
const components = ${JSON.stringify(components, null, 2)};

// Estilos inline para cada componente
const getComponentStyle = (component) => {
  return ${this.generateStyleFunction(options)};
};`;
  }

  private generateWebComponents(components: CanvasComponent[], options: CodeGenerationOptions): string {
    return `// Web Components gerados pelo Buildify
${components.map(comp => this.generateWebComponent(comp, options)).join('\n\n')}`;
  }

  private generateWebComponent(component: CanvasComponent, options: CodeGenerationOptions): string {
    const { type, style, props } = component;
    const styleString = this.generateStyleString(style, options);

    return `class ${this.toPascalCase(type)}Component extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = \`
      <div style="${styleString}">
        ${this.generateWebComponentContent(type, props)}
      </div>
    \`;
  }
}

customElements.define('${type}-component', ${this.toPascalCase(type)}Component);`;
  }

  private generateWebComponentContent(type: string, props: any): string {
    switch (type) {
      case 'button':
        return props.text || 'Botão';
      case 'card':
        return `<h3>${props.title || 'Título do Card'}</h3><p>${props.description || 'Descrição do card aqui...'}</p>`;
      case 'text':
        return props.text || 'Texto';
      case 'input':
        return `<input placeholder="${props.placeholder || 'Digite aqui...'}" type="text" />`;
      default:
        return `<!-- ${type} component -->`;
    }
  }

  private generateStyleString(style: any, options: CodeGenerationOptions): string {
    if (options.styling === 'styled-components') {
      return this.generateStyledComponentsStyle(style);
    }

    return `{
      position: 'absolute',
      left: ${style.position.x}px,
      top: ${style.position.y}px,
      width: ${style.size.width}px,
      height: ${style.size.height}px,
      backgroundColor: '${style.backgroundColor}',
      color: '${style.color}',
      fontSize: ${style.fontSize}px,
      fontFamily: '${style.fontFamily}',
      fontWeight: ${style.fontWeight},
      textAlign: '${style.textAlign}',
      borderRadius: ${style.borderRadius}px,
      border: '${style.borderWidth}px solid ${style.borderColor}',
      padding: '${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px',
      margin: '${style.margin.top}px ${style.margin.right}px ${style.margin.bottom}px ${style.margin.left}px',
      boxShadow: '${style.boxShadow}',
      opacity: ${style.opacity},
      transform: '${style.transform}',
      filter: '${style.filter}',
      zIndex: ${style.zIndex}
    }`;
  }

  private generateStyledComponentsStyle(style: any): string {
    return `styled.div\`
      position: absolute;
      left: ${style.position.x}px;
      top: ${style.position.y}px;
      width: ${style.size.width}px;
      height: ${style.size.height}px;
      background-color: ${style.backgroundColor};
      color: ${style.color};
      font-size: ${style.fontSize}px;
      font-family: ${style.fontFamily};
      font-weight: ${style.fontWeight};
      text-align: ${style.textAlign};
      border-radius: ${style.borderRadius}px;
      border: ${style.borderWidth}px solid ${style.borderColor};
      padding: ${style.padding.top}px ${style.padding.right}px ${style.padding.bottom}px ${style.padding.left}px;
      margin: ${style.margin.top}px ${style.margin.right}px ${style.margin.bottom}px ${style.margin.left}px;
      box-shadow: ${style.boxShadow};
      opacity: ${style.opacity};
      transform: ${style.transform};
      filter: ${style.filter};
      z-index: ${style.zIndex};
    \``;
  }

  private generateStyles(components: CanvasComponent[], options: CodeGenerationOptions): string {
    if (options.styling === 'css-modules') {
      return this.generateCSSModules(components);
    }

    return `/* Estilos gerados pelo Buildify */
.buildify-app {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f9fafb;
}

${components.map(comp => this.generateComponentCSS(comp)).join('\n')}`;
  }

  private generateCSSModules(components: CanvasComponent[]): string {
    return `.buildifyApp {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f9fafb;
}

${components.map(comp => this.generateComponentCSSModule(comp)).join('\n')}`;
  }

  private generateComponentCSS(component: CanvasComponent): string {
    return `.component-${component.id} {
  position: absolute;
  left: ${component.style.position.x}px;
  top: ${component.style.position.y}px;
  width: ${component.style.size.width}px;
  height: ${component.style.size.height}px;
  background-color: ${component.style.backgroundColor};
  color: ${component.style.color};
  font-size: ${component.style.fontSize}px;
  font-family: ${component.style.fontFamily};
  font-weight: ${component.style.fontWeight};
  text-align: ${component.style.textAlign};
  border-radius: ${component.style.borderRadius}px;
  border: ${component.style.borderWidth}px solid ${component.style.borderColor};
  padding: ${component.style.padding.top}px ${component.style.padding.right}px ${component.style.padding.bottom}px ${component.style.padding.left}px;
  margin: ${component.style.margin.top}px ${component.style.margin.right}px ${component.style.margin.bottom}px ${component.style.margin.left}px;
  box-shadow: ${component.style.boxShadow};
  opacity: ${component.style.opacity};
  transform: ${component.style.transform};
  filter: ${component.style.filter};
  z-index: ${component.style.zIndex};
}`;
  }

  private generateComponentCSSModule(component: CanvasComponent): string {
    return `.component${component.id.replace(/-/g, '')} {
  position: absolute;
  left: ${component.style.position.x}px;
  top: ${component.style.position.y}px;
  width: ${component.style.size.width}px;
  height: ${component.style.size.height}px;
  background-color: ${component.style.backgroundColor};
  color: ${component.style.color};
  font-size: ${component.style.fontSize}px;
  font-family: ${component.style.fontFamily};
  font-weight: ${component.style.fontWeight};
  text-align: ${component.style.textAlign};
  border-radius: ${component.style.borderRadius}px;
  border: ${component.style.borderWidth}px solid ${component.style.borderColor};
  padding: ${component.style.padding.top}px ${component.style.padding.right}px ${component.style.padding.bottom}px ${component.style.padding.left}px;
  margin: ${component.style.margin.top}px ${component.style.margin.right}px ${component.style.margin.bottom}px ${component.style.margin.left}px;
  box-shadow: ${component.style.boxShadow};
  opacity: ${component.style.opacity};
  transform: ${component.style.transform};
  filter: ${component.style.filter};
  z-index: ${component.style.zIndex};
}`;
  }

  private generateStyleFunction(_options: CodeGenerationOptions): string {
    return `(component) => {
      const style = component.style;
      return {
        position: 'absolute',
        left: style.position.x + 'px',
        top: style.position.y + 'px',
        width: style.size.width + 'px',
        height: style.size.height + 'px',
        backgroundColor: style.backgroundColor,
        color: style.color,
        fontSize: style.fontSize + 'px',
        fontFamily: style.fontFamily,
        fontWeight: style.fontWeight,
        textAlign: style.textAlign,
        borderRadius: style.borderRadius + 'px',
        border: style.borderWidth + 'px solid ' + style.borderColor,
        padding: style.padding.top + 'px ' + style.padding.right + 'px ' + style.padding.bottom + 'px ' + style.padding.left + 'px',
        margin: style.margin.top + 'px ' + style.margin.right + 'px ' + style.margin.bottom + 'px ' + style.margin.left + 'px',
        boxShadow: style.boxShadow,
        opacity: style.opacity,
        transform: style.transform,
        filter: style.filter,
        zIndex: style.zIndex
      };
    }`;
  }

  private generateEmptyComponent(options: CodeGenerationOptions): string {
    switch (options.format) {
      case 'react':
        return `import React from 'react';

const BuildifyApp: React.FC = () => {
  return (
    <div className="buildify-app">
      <p>Adicione componentes para começar!</p>
    </div>
  );
};

export default BuildifyApp;`;

      case 'vue':
        return `<template>
  <div class="buildify-app">
    <p>Adicione componentes para começar!</p>
  </div>
</template>

<script setup lang="ts">
// Componentes Vue gerados pelo Buildify
</script>

<style scoped>
.buildify-app {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>`;

      default:
        return '// Adicione componentes para começar!';
    }
  }

  private toPascalCase(str: string): string {
    return str.replace(/(?:^|[-_])(\w)/g, (_, c) => c.toUpperCase());
  }
}
