import 'mo/style/main.scss';
import 'vscode-codicons/dist/codicon.css';

import * as React from 'react';
import { ILocalization } from 'mo/model/localization';
import { container } from 'tsyringe';
import { ExtensionService, IExtensionService } from 'mo/services/extensionService';
import { defaultExtensions } from 'mo/extensions';
import { IExtensionEntry } from 'mo/model/extension';

interface IMoleculeProps {
    extensionEntry?: IExtensionEntry;
    locales?: ILocalization[];
}

export const MoleculeCtx = React.createContext({});
export class MoleculeProvider extends React.Component<IMoleculeProps> {
    private extensionService!: IExtensionService;
    constructor(props) {
        super(props);
        console.log('Molecule constructed.');
    }

    componentDidMount() {
        const { extensionEntry = {} } = this.props;
        this.extensionService = container.resolve(ExtensionService);
        this.extensionService.load(defaultExtensions);
        this.extensionService.load(extensionEntry);
    }

    public render() {
        return (
            <MoleculeCtx.Provider value={{}}>
                { this.props.children }
            </MoleculeCtx.Provider>
        );
    }
}
