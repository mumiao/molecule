import { ErrorMsg } from '@/common/error';
import { IContribute, IContributeType, IExtension, IExtensionEntry } from '@/core/extension';
import { IMolecule } from '@/core/molecule';
import { defaultExtensions } from '@/extensions';

export class ExtensionService {
    public extensions: IExtension[] = [];
    public moleculeCtx: IMolecule;

    constructor(extensionEntry: IExtensionEntry = {}, moleculeCtx: IMolecule) {
        this.moleculeCtx = moleculeCtx;
        this.load(defaultExtensions, moleculeCtx);
        this.load(extensionEntry, moleculeCtx);
    }

    /**
     * TODO: Current extension service can't parses VSCode theme, so needs to refactor
     * @param param0 extensionEntry object
     * @param moleculeCtx the context object of molecule
     */
    public load({ location, extensions = [] }: IExtensionEntry, moleculeCtx: IMolecule) {
        try {
            if (extensions?.length === 0) return;
            this.extensions = this.extensions.concat(extensions || []);

            extensions?.forEach((extension: IExtension, index: number) => {
                if (extension.main) {
                    if (extension.activate) {
                        extension.activate(moleculeCtx);
                    } else {
                        throw new Error(ErrorMsg.NotFoundActivate);
                    }
                }
                if (extension.contributes) {
                    this.loadContributes(extension.contributes);
                }
            });
        } catch (e) {
            console.error(ErrorMsg.LoadExtensionFail, e);
        }
    }

    public loadContributes(contributes: IContribute) {
        const contributeKeys = Object.keys(contributes);
        contributeKeys.forEach((type: string) => {
            if (type === IContributeType.Commands) {
                console.log('contributeKeys:', type);
                // ThemeService.load(extension[type]);
                // exts.push(extension);
            }
        });
    }

    unload(id: string) {
        console.log('unload extension:', id);
    }
}