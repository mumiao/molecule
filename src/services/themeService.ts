/**
 * VSCode theme extends guides: https://code.visualstudio.com/api/extension-guides/color-theme
 * https://code.visualstudio.com/api/references/theme-color
 */

import { IExtension } from 'mo/model/extension';
import { ITheme, ThemeColor, TokenColor } from 'mo/model/theme';
import { container, inject, singleton } from 'tsyringe';
import * as monaco from 'monaco-editor';

/**
 * Apply css content to workbench
 * @param styleSheetContent CSS sheet content
 * @param rulesClassName Style tag class Name
 */
function _applyRules(styleSheetContent: string, rulesClassName: string) {
    const themeStyles = document.head.getElementsByClassName(rulesClassName);
    if (themeStyles.length === 0) {
        const elStyle = document.createElement('style');
        elStyle.type = 'text/css';
        elStyle.className = rulesClassName;
        elStyle.innerHTML = styleSheetContent;
        document.head.appendChild(elStyle);
    } else {
        (<HTMLStyleElement>themeStyles[0]).innerHTML = styleSheetContent;
    }
}

@singleton()
export class ThemeService implements ITheme {
    id: string;
    name: string;
    colors: ThemeColor;
    tokenColors: TokenColor[];
    semanticHighlighting: boolean;

    constructor(
        @inject('ThemeID') id: string,
        @inject('ThemeName') name: string,
        @inject('ThemeColor') colors: ThemeColor = [],
        @inject('TokenColor') tokenColors: TokenColor[] = [],
        @inject('SemanticHighLighting') semanticHighlighting: boolean = true
    ) {
        this.id = id;
        this.name = name;
        this.colors = colors;
        this.tokenColors = tokenColors;
        this.semanticHighlighting = semanticHighlighting;
        this.init();
    }

    public init() {
        monaco.editor.setTheme(this.id);
    }

    public load(extension: IExtension): void {
        // const theme = this.parse(extension);
    }

    public getThemeById(themeId: string, extension: IExtension) {}

    public applyTheme() {
        _applyRules('', '');
    }
}

container.register('ThemeID', { useValue: 'vs-dark' });
container.register('ThemeName', { useValue: 'vs-dark' });
container.register('ThemeColor', { useValue: [] });
container.register('TokenColor', { useValue: [] });
container.register('SemanticHighLighting', { useValue: true });
